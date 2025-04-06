import { ethers } from 'ethers';
import registryJson from '../../public/abis/Election.sol/Registry.json';
// import ballotJson from '../public/abis/Election.sol/Ballot.json';

export const contractConfigs = {
  Registry: {
    address: process.env.NEXT_PUBLIC_REGISTRY_ADDRESS || '',
    abi: registryJson.abi,
  },
  // Add other contracts here
};

export const instantiateContract = (
  contractName: keyof typeof contractConfigs,
  signer: ethers.Signer
): ethers.Contract | null => {
  const config = contractConfigs[contractName];
  if (!config) {
    console.error(`Contract configuration for ${contractName} not found.`);
    return null;
  }
  return new ethers.Contract(config.address, config.abi, signer);
};
