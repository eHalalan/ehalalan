import { Election, VoteData } from '@/types/election';
import { db } from './database';
import { isVoterVerified } from './DAO/votersRegistry';
import { collection, doc, getDoc, runTransaction } from 'firebase/firestore';

const electionsCol = collection(db, 'elections');

export async function vote(
  voterAddress: string,
  ballotAddress: string,
  voteData: VoteData
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

  const isVerified: boolean = await isVoterVerified(voterAddress);

  if (!isVerified) {
    throw new Error('You are not a verified voter.');
  }

  const electionVotersColRef = collection(electionDocRef, 'voters');
  const voterDocRef = doc(electionVotersColRef, voterAddress);
  const voterDoc = await getDoc(voterDocRef);
  if (voterDoc.exists()) {
    throw new Error('You have already voted.');
  }

  const electionData = electionDoc.data() as Election;
  const { presidentVote, vicePresidentVote, senatorVotes } = voteData;
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
