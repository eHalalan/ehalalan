import { Timestamp } from 'firebase/firestore';

// Convert form data to Firestore-ready VoterDetails
export function formToVoterDetails(formData, uid) {
  return {
    uid,
    fullName: formData.fullName,
    placeOfBirth: formData.placeOfBirth,
    dateOfBirth: formData.dateOfBirth,
    verified: false, // Default to unverified
    registrationDate: Timestamp.now(),
    lastUpdated: Timestamp.now(),
  };
}

// Convert Firestore VoterDetails to form data
export function voterDetailsToForm(voterDetails) {
  return {
    fullName: voterDetails.fullName,
    email: voterDetails.email,
    placeOfBirth: voterDetails.placeOfBirth,
    dateOfBirth: voterDetails.dateOfBirth.toDate(), // Convert to JS Date
  };
}

// Helper to convert various date formats to Firestore Timestamp
function toFirestoreTimestamp(dateInput) {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return Timestamp.fromDate(date);
}
