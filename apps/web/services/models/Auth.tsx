'use client';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError,
  onAuthStateChanged,
  getAuth,
  User,
  signOut,
} from 'firebase/auth';
import { auth } from '../database'; // Your Firebase initialization file
import { useState, useEffect, createContext, ReactNode } from 'react';

export interface AuthModel {
  email: string;
  password: string;
}

// Initialize Firebase Auth
// Create the AuthContext with proper typing
interface AuthContextType {
  currentUser: User | null;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
});

// AuthProvider component with proper props typing
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
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

export async function registerUser(authData: AuthModel): Promise<string> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      authData.email,
      authData.password
    );

    return userCredential.user.uid; // Return the UID of the newly created user
  } catch (error) {
    console.error('Registration error:', error);
    throw handleAuthError(error as AuthError);
  }
}

// Login existing user
export async function loginUser(
  email: string,
  password: string
): Promise<string> {
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
    throw handleAuthError(error as AuthError);
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw handleAuthError(error as AuthError);
  }
}

function handleAuthError(error: AuthError): Error {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return new Error('The email address is already in use');
    case 'auth/invalid-email':
      return new Error('The email address is invalid');
    case 'auth/weak-password':
      return new Error('The password is too weak');
    case 'auth/operation-not-allowed':
      return new Error('Email/password accounts are not enabled');
    default:
      return new Error('An unexpected error occurred');
  }
}
