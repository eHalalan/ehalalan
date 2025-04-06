import { db } from '../database';
import {
  collection,
  doc,
  setDoc,
  DocumentReference,
  query,
  where,
  limit,
  getDocs,
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

export async function isVoterVerified(address: string): Promise<boolean> {
  // const voterDoc = doc(votersCol, address);

  const voterQuery = query(votersCol, where('wallet', '==', address), limit(1));
  const res = await getDocs(voterQuery);

  return !res.empty;
}
