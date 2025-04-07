import { db } from '@/services/database';
import { VoterWithWallet } from '@/services/models/VoterDetails';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export async function getVoters(): Promise<VoterWithWallet[]> {
  const voterCol = collection(db, 'registry');
  const voterDocs = await getDocs(voterCol);

  const voters: VoterWithWallet[] = [];

  for (const doc of voterDocs.docs) {
    voters.push(doc.data() as VoterWithWallet);
  }

  return voters;
}

export async function getVoter(id: string): Promise<VoterWithWallet | null> {
  const votersCol = collection(db, 'registry');
  const voterDoc = doc(votersCol, id);
  const voter = await getDoc(voterDoc);

  if (!voter.exists()) {
    return null;
  }

  const voterData = voter.data() as VoterWithWallet;
  return voterData;
}
