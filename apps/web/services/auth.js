// services/auth.js
'use client';

import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { useState, useEffect, useContext, createContext } from 'react';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only once
let app;
export let auth;

if (typeof window !== 'undefined') {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } else {
    app = getApps()[0];
    auth = getAuth(app);
  }
}

// Create Auth Context
const AuthContext = createContext({
  currentUser: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Authentication functions
export const authService = {
  registerUser: async (email, password) => {
    try {
      if (!auth) throw new Error('Firebase Auth not initialized');
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error('Registration error:', error.code, error.message);
      throw formatAuthError(error);
    }
  },

  loginUser: async (email, password) => {
    try {
      if (!auth) throw new Error('Firebase Auth not initialized');
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error.code, error.message);
      throw formatAuthError(error);
    }
  },

  logoutUser: async () => {
    try {
      if (!auth) throw new Error('Firebase Auth not initialized');
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error.code, error.message);
      throw formatAuthError(error);
    }
  },
};

// Helper function to format auth errors
function formatAuthError(error) {
  switch (error.code) {
    case 'auth/invalid-email':
      return new Error('Invalid email address');
    case 'auth/user-disabled':
      return new Error('This account has been disabled');
    case 'auth/user-not-found':
      return new Error('No account found with this email');
    case 'auth/wrong-password':
      return new Error('Incorrect password');
    case 'auth/email-already-in-use':
      return new Error('Email already in use');
    case 'auth/operation-not-allowed':
      return new Error('Email/password accounts are not enabled');
    case 'auth/weak-password':
      return new Error('Password should be at least 6 characters');
    case 'auth/too-many-requests':
      return new Error('Too many attempts. Please try again later');
    default:
      return new Error('Authentication failed. Please try again');
  }
}
