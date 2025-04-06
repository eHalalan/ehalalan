import { ethers } from 'hardhat';
import dotenv from 'dotenv';
import {
  presidents,
  vicePresidents,
  senators,
  type,
} from '../data/ballotSample.json';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Election, ElectionType } from '../types/election';

dotenv.config();

const electionCol = collection(db, 'elections');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  const registryAddress = process.env.REGISTRY_ADDRESS;
  if (!registryAddress) {
    console.error(
      'Error: REGISTRY_ADDRESS is not set in the environment variables.'
    );
    process.exit(1);
  }

  const Ballot = await ethers.getContractFactory('Ballot');
  const ballot = await Ballot.deploy(
    registryAddress,
    presidents.map((president) => president.name),
    vicePresidents.map((vicePresident) => vicePresident.name),
    senators.map((senator) => senator.name)
  );
  await ballot.waitForDeployment();

  console.log(`Using Registry at: ${registryAddress}`);
  console.log(`Ballot deployed to: ${await ballot.getAddress()}`);
  console.log('Storing election into DB.');

  const ballotId = await ballot.getAddress();
  const election: Election = {
    id: ballotId,
    isActive: false,
    endDate: new Date().toISOString(),
    type: type as ElectionType,
    presidents: presidents.map((president) => ({ ...president, voteCount: 0 })),
    vicePresidents: vicePresidents.map((president) => ({
      ...president,
      voteCount: 0,
    })),
    senators: senators.map((president) => ({ ...president, voteCount: 0 })),
  };

  const electionDocRef = doc(electionCol, ballotId);
  await setDoc(electionDocRef, election);
  console.log('Successfully stored election data into DB.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
