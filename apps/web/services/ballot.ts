import { Election, VoteData } from '@/types/election';
import { db } from './database';
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  runTransaction,
} from 'firebase/firestore';
import { BallotFactory } from '@/lib/contracts/factory';
import { ethers } from 'ethers';
import { getVoter } from '@/lib/voters';

const electionsCol = collection(db, 'elections');

export async function hasAlreadyVoted(id: string, voterWallet: string) {
  const electionDocRef = doc(electionsCol, id);
  const electionDoc = await getDoc(electionDocRef);

  if (!electionDoc.exists()) {
    throw new Error("Election doesn't exist.");
  }

  const electionVotersColRef = collection(electionDocRef, 'voters');
  const voterDocRef = doc(electionVotersColRef, voterWallet);
  const voterDoc = await getDoc(voterDocRef);

  return voterDoc.exists();
}

export async function vote(
  userId: string,
  voterAddress: string,
  ballotAddress: string,
  voteData: VoteData,
  signer: ethers.JsonRpcSigner
) {
  const electionDocRef = doc(electionsCol, ballotAddress);
  const electionDoc = await getDoc(electionDocRef);

  if (!electionDoc.exists()) {
    throw new Error("Election doesn't exist.");
  }

  const election = electionDoc.data() as Election;
  if (!election.isActive) {
    throw new Error('This Election is not ongoing.');
  }

  const voter = await getVoter(userId);

  if (!voter) {
    throw new Error('Voter not found.');
  }

  if (!voter.verified) {
    throw new Error('You are not a verified voter.');
  }

  if (voter.wallet !== voterAddress) {
    throw new Error('Wallet attached to user does not match.');
  }

  const electionVotersColRef = collection(electionDocRef, 'voters');
  const voterDocRef = doc(electionVotersColRef, voterAddress);
  const voterDoc = await getDoc(voterDocRef);
  if (voterDoc.exists()) {
    throw new Error('You have already voted.');
  }

  const electionData = electionDoc.data() as Election;
  const { presidentVote, vicePresidentVote, senatorVotes } = voteData;

  const ballot = BallotFactory(ballotAddress, signer);
  await ballot.vote(presidentVote, vicePresidentVote, senatorVotes);

  // -1 or out of range just means abstain
  if (
    electionData.presidents &&
    presidentVote >= 0 &&
    presidentVote < electionData.presidents.length
  ) {
    electionData.presidents[presidentVote].voteCount++;
  }

  if (
    electionData.vicePresidents &&
    vicePresidentVote >= 0 &&
    vicePresidentVote < electionData.vicePresidents.length
  ) {
    electionData.vicePresidents[vicePresidentVote].voteCount++;
  }

  for (const senatorVote of senatorVotes) {
    if (senatorVote >= 0 && senatorVote < electionData.senators.length) {
      electionData.senators[senatorVote].voteCount++;
    }
  }

  await runTransaction(db, async (t) => {
    // Mark voter as voted
    t.set(voterDocRef, {
      uid: voterAddress,
      voted: true,
    });

    t.update(electionDocRef, { ...electionData });
  });
}

export async function getNumVoted(id: string): Promise<number> {
  const electionDocRef = doc(electionsCol, id);
  const electionDoc = await getDoc(electionDocRef);

  if (!electionDoc.exists()) {
    throw new Error("Election doesn't exist.");
  }

  const electionVotersColRef = collection(electionDocRef, 'voters');
  const numVoted = (await getCountFromServer(electionVotersColRef)).data()
    .count;

  return numVoted;
}
