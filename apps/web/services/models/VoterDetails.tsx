import firestore from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

export interface VoterDetails {
  uid: string; // Matches AuthModel.uid
  fullName: string;
  email: string; // Duplicated from auth for querying
  placeOfBirth: string;
  dateOfBirth: firestore.Timestamp;
  verified: boolean;
  registrationDate: firestore.Timestamp;
  lastUpdated: firestore.Timestamp;
}

export interface VoterFormData {
  fullName: string;
  email: string;
  placeOfBirth: string;
  dateOfBirth: Date | string; // Can handle both Date object or ISO string
  // No need for uid, verified, or timestamps here
}

// Convert form data to Firestore-ready VoterDetails
export function formToVoterDetails(
  formData: VoterFormData,
  uid: string
): VoterDetails {
  return {
    uid,
    fullName: formData.fullName,
    email: formData.email,
    placeOfBirth: formData.placeOfBirth,
    dateOfBirth: toFirestoreTimestamp(formData.dateOfBirth),
    verified: false, // Default to unverified
    registrationDate: Timestamp.now(),
    lastUpdated: Timestamp.now(),
  };
}

// Convert Firestore VoterDetails to form data
export function voterDetailsToForm(voterDetails: VoterDetails): VoterFormData {
  return {
    fullName: voterDetails.fullName,
    email: voterDetails.email,
    placeOfBirth: voterDetails.placeOfBirth,
    dateOfBirth: voterDetails.dateOfBirth.toDate(), // Convert to JS Date
  };
}

// Helper to convert various date formats to Firestore Timestamp
function toFirestoreTimestamp(dateInput: Date | string): Timestamp {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return Timestamp.fromDate(date);
}
