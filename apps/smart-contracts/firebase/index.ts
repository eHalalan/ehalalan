import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY ?? '',
  authDomain: 'e-halalan.firebaseapp.com',
  projectId: 'e-halalan',
  storageBucket: 'e-halalan.firebasestorage.app',
  messagingSenderId: '347302095506',
  appId: '1:347302095506:web:7527815f424a44b436d44b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
