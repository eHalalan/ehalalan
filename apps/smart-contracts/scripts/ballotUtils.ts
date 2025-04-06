import * as readline from 'readline/promises';
import { ethers } from 'hardhat';
import { Ballot } from '../typechain-types';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getBallotContract(): Promise<Ballot> {
  const address = await rl.question('Enter Ballot Address: ');
  const ballot = await ethers.getContractAt('Ballot', address);
  return ballot;
}

const electionsColRef = collection(db, 'elections');

async function deactivate() {
  const ballot = await getBallotContract();
  const address = await ballot.getAddress();

  console.log(`Deactivating ballot: ${address}`);
  await ballot.setElectionStatus(false);
  console.log(`Deactivated ballot: ${address}`);

  console.log('Updating data in DB.');
  const electionDocRef = doc(electionsColRef, address);
  await updateDoc(electionDocRef, { isActive: false });
  console.log('Updated data in DB.');
}

async function activate() {
  const ballot = await getBallotContract();
  const address = await ballot.getAddress();

  console.log(`Activating ballot: ${address}`);
  await ballot.setElectionStatus(false);
  console.log(`Activated ballot: ${address}`);

  console.log('Updating data in DB.');
  const electionDocRef = doc(electionsColRef, address);
  await updateDoc(electionDocRef, { isActive: true });
  console.log('Updated data in DB.');
}

async function start() {
  try {
    console.log('Utils:\n1. Activate Ballot\n2. Deactivate Ballot');
    const choice = await rl.question('Choice: ');

    switch (choice.toLowerCase()) {
      case '1':
        await activate();
        break;
      case '2':
        await deactivate();
        break;
    }
  } finally {
    rl.close();
  }
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
