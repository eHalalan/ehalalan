import { db } from '../database';
import { collection, doc, setDoc } from 'firebase/firestore';

const votersCol = collection(db, 'registry');

// Register a new voter with additional information
export async function registerVoterDetails({
  uid,
  fullName,
  placeOfBirth,
  dateOfBirth,
  verified,
  registrationDate,
  lastUpdated,
}) {
  const voterDoc = doc(votersCol, uid);

  // const birthDateTimestamp = Timestamp.fromDate(new Date(dateOfBirth));
  try {
    await setDoc(voterDoc, {
      fullName,
      placeOfBirth,
      dateOfBirth,
      verified,
      registrationDate,
      lastUpdated,
    });
    return voterDoc;
  } catch (error) {
    console.error('Registration to firebase failed:', error);
  }
}
