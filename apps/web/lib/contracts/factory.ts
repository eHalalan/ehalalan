import { ethers } from 'ethers';
import registryJson from '../../public/abis/Election.sol/Registry.json';
import ballotJson from '../../public/abis/Election.sol/Ballot.json';

export const RegistryFactory = (
  signer: ethers.Signer
): ethers.Contract | null => {
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_REGISTRY_ADDRESS ?? '',
    registryJson.abi,
    signer
  );
};

export const BallotFactory = (
  address: string,
  signer: ethers.Signer
): ethers.Contract | null => {
  return new ethers.Contract(address, ballotJson.abi, signer);
};
