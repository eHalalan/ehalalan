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
} from 'firebase/firestore';

const votersCol = collection(db, 'registry');

// Register a new voter
export async function registerVoter(voterAddress, fullName) {
  const voterDoc = doc(votersCol, voterAddress);
  await setDoc(voterDoc, {
    fullName,
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

// Get all verified voters
export async function getVerifiedVoters() {
  const q = query(votersCol, where('verified', '==', true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
