import { db } from '@/services/database';
import { Election } from '@/types/election';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export async function getElections(): Promise<Election[]> {
  const electionCol = collection(db, 'elections');
  const electionDocs = await getDocs(electionCol);

  const elections: Election[] = [];

  for (const doc of electionDocs.docs) {
    elections.push(doc.data() as Election);
  }

  return elections;
}

export async function getElection(id: string): Promise<Election | null> {
  const electionsCol = collection(db, 'elections');
  const electionDoc = doc(electionsCol, id);
  const election = await getDoc(electionDoc);

  if (!election.exists()) {
    return null;
  }

  const electionData = election.data() as Election;
  return electionData;
}
