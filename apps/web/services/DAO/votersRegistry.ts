import { db } from '../database';
import { collection, doc, setDoc, DocumentReference } from 'firebase/firestore';
import { VoterDetails } from '@/services/models/VoterDetails';
const votersCol = collection(db, 'registry');

export async function registerVoterDetails({
  uid,
  fullName,
  placeOfBirth,
  dateOfBirth,
  verified,
  registrationDate,
  lastUpdated,
}: VoterDetails): Promise<DocumentReference> {
  const voterDoc = doc(votersCol, uid);

  try {
    await setDoc(voterDoc, {
      fullName,
      placeOfBirth,
      dateOfBirth,
      verified,
      registrationDate: registrationDate.toString(),
      lastUpdated: lastUpdated.toString(),
    });
    return voterDoc;
  } catch (error) {
    console.error('Registration to firebase failed:', error);
    throw error;
  }
}

export async function isVoterVerified(address: string): Promise<boolean> {
  // const voterDoc = doc(votersCol, address);

  return true;
}
