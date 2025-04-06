import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
} from 'firebase/auth';
import { auth } from '../auth'; // Your Firebase initialization file
import { useState, useEffect, createContext } from 'react';

// Initialize Firebase Auth
export const AuthContext = createContext({
  currentUser: null,
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export async function registerUser(authData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      authData.email,
      authData.password
    );

    return userCredential.user.uid;
  } catch (error) {
    throw handleAuthError(error);
  }
}

export async function loginUser(email, password) {
  try {
    if (!auth) throw new Error('Firebase Auth not initialized');
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user.uid;
  } catch (error) {
    console.error('Login error:', error);
    throw handleAuthError(error);
  }
}

function handleAuthError(error) {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return new Error('The email address is already in use');
    case 'auth/invalid-email':
      return new Error('The email address is invalid');
    case 'auth/weak-password':
      return new Error('The password is too weak');
    case 'auth/operation-not-allowed':
      return new Error('Email/password accounts are not enabled');
    case 'auth/user-not-found':
      return new Error('No user found with this email');
    case 'auth/wrong-password':
      return new Error('Incorrect password');
    default:
      console.error('Unhandled auth error:', error.code);
      return new Error('An unexpected error occurred');
  }
}
