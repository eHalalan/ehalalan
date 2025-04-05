import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import hre from 'hardhat';

const defaultPresidents = ['Alice', 'Bob'];
const defaultVicePresidents = ['Charlie', 'Dave'];
const defaultSenators = [
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

describe('Election', function () {
  async function deployElectionFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Registry = await hre.ethers.getContractFactory('Registry');
    const registry = await Registry.deploy();
    await registry.waitForDeployment();

    const Ballot = await hre.ethers.getContractFactory('Ballot');
    const ballot = await Ballot.deploy(
      registry.getAddress(),
      defaultPresidents,
      defaultVicePresidents,
      defaultSenators
    );
    await ballot.waitForDeployment();

    return { registry, ballot, owner, otherAccount };
  }

  describe('Deployment', function () {
    it('Should set the right names', async function () {
      const { ballot } = await loadFixture(deployElectionFixture);

      const [presidents, vicePresidents, senators] =
        await ballot.getStatistic();

      const presidentNames = presidents.map((p: any) => p[0]);
      const vicePresidentNames = vicePresidents.map((vp: any) => vp[0]);
      const senatorNames = senators.map((s: any) => s[0]);

      expect(presidentNames).to.deep.equal(defaultPresidents);
      expect(vicePresidentNames).to.deep.equal(defaultVicePresidents);
      expect(senatorNames).to.deep.equal(defaultSenators);
    });
  });
});
