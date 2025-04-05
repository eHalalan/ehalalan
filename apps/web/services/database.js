// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAOn-QCIWLxYrAU_5W-D_YVuG8RN7HN7UM',
  authDomain: 'e-halalan.firebaseapp.com',
  projectId: 'e-halalan',
  storageBucket: 'e-halalan.firebasestorage.app',
  messagingSenderId: '347302095506',
  appId: '1:347302095506:web:7527815f424a44b436d44b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

export { db, auth };
