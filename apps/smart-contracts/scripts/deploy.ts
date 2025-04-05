import hre from 'hardhat';

const presidents = ['Alice', 'Bob'];
const vicePresidents = ['Charlie', 'Dave'];
const senators = [
  'Earl',
  'Frank',
  'George',
  'Harry',
  'Irene',
  'Jack',
  'Karen',
  'Larry',
  'Mary',
  'Nick',
  'Oliver',
  'Patrick',
  'Quentin',
];

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log('Deploying contracts with the account: ' + deployer.address);

  const Registry = await hre.ethers.getContractFactory('Registry');
  const registry = await Registry.deploy();
  await registry.waitForDeployment();

  const Ballot = await hre.ethers.getContractFactory('Ballot');
  const ballot = await Ballot.deploy(
    registry.getAddress(),
    presidents,
    vicePresidents,
    senators
  );
  await ballot.waitForDeployment();

  console.log(`Registry deployed to: ${await registry.getAddress()}`);
  console.log(`Ballot deployed to: ${await ballot.getAddress()}`);
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
