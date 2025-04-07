import { db } from '../database';
import {
  collection,
  doc,
  setDoc,
  DocumentReference,
  query,
  where,
  getCountFromServer,
} from 'firebase/firestore';
import { VoterDetails, VoterWithWallet } from '@/services/models/VoterDetails';
const votersCol = collection(db, 'registry');

export async function registerVoterDetails(
  voterData: VoterDetails
): Promise<DocumentReference> {
  const voterDoc = doc(votersCol, voterData.uid);

  try {
    const voter: VoterWithWallet = { ...voterData, wallet: '' };

    await setDoc(voterDoc, voter);
    return voterDoc;
  } catch (error) {
    console.error('Registration to firebase failed:', error);
    throw error;
  }
}

export async function getNumRegisteredVoters(): Promise<number> {
  const registeredVotersQuery = query(votersCol, where('verified', '==', true));
  const numVoters = (await getCountFromServer(registeredVotersQuery)).data()
    .count;

  return numVoters;
}
