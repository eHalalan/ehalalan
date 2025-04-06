import hre from 'hardhat';

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log('Deploying contracts with the account: ' + deployer.address);

  const Registry = await hre.ethers.getContractFactory('Registry');
  const registry = await Registry.deploy();
  await registry.waitForDeployment();

  console.log(`Registry deployed to: ${await registry.getAddress()}`);
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
