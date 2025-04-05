import { db } from './database';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

const votersCol = collection(db, 'registry');

// Register a new voter with additional information
export async function registerVoter(
  voterAddress,
  fullName,
  placeOfBirth,
  dateOfBirth
) {
  const voterDoc = doc(votersCol, voterAddress);

  // Convert JS Date to Firestore Timestamp for dateOfBirth
  const birthDateTimestamp = Timestamp.fromDate(new Date(dateOfBirth));

  await setDoc(voterDoc, {
    fullName,
    placeOfBirth,
    dateOfBirth: birthDateTimestamp,
    verified: true,
    registeredAt: serverTimestamp(), // Firebase server-side timestamp
  });
  return voterDoc;
}

// Check if voter is verified
export async function isVoterVerified(voterAddress) {
  const voterDoc = doc(votersCol, voterAddress);
  const snapshot = await getDoc(voterDoc);
  return snapshot.exists() && snapshot.data().verified;
}

// Get all verified voters with birth information
export async function getVerifiedVoters() {
  const q = query(votersCol, where('verified', '==', true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      fullName: data.fullName,
      placeOfBirth: data.placeOfBirth,
      dateOfBirth: data.dateOfBirth?.toDate(), // Convert Firestore Timestamp to JS Date
      verified: data.verified,
      registeredAt: data.registeredAt?.toDate(),
    };
  });
}
