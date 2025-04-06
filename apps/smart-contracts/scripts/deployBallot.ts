import { ethers } from 'hardhat';
import dotenv from 'dotenv';
import {
  presidents,
  vicePresidents,
  senators,
} from '../data/ballotSample.json';

dotenv.config();

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
    presidents,
    vicePresidents,
    senators
  );
  await ballot.waitForDeployment();

  console.log(`Using Registry at: ${registryAddress}`);
  console.log(`Ballot deployed to: ${await ballot.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
