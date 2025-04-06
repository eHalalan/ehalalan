import { ethers } from 'ethers';

export async function verifySignature(
  address: string,
  message: string,
  signature: string
): Promise<boolean> {
  const recoveredAddress = ethers.verifyMessage(message, signature);
  return recoveredAddress === address;
}
