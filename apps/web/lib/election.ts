import { Election, ElectionType } from '@/types/election';

const electionsDummyData: Election[] = [
  {
    id: '1',
    isActive: true,
    endDate: new Date('2025-04-06').toISOString(),
    type: ElectionType.NATIONAL,
    presidents: [
      { name: 'Alex', party: 'Partido', voteCount: 0 },
      { name: 'Bob', party: 'Partido', voteCount: 0 },
    ],
    vicePresidents: [
      { name: 'Earl', party: 'Partido', voteCount: 0 },
      { name: 'Frank', party: 'Partido', voteCount: 0 },
    ],
    senators: [
      { name: 'Charlie', party: 'Partido', voteCount: 0 },
      { name: 'Dean', party: 'Partido', voteCount: 0 },
      { name: 'Edward', party: 'Partido', voteCount: 0 },
      { name: 'Frank', party: 'Partido', voteCount: 0 },
      { name: 'George', party: 'Partido', voteCount: 0 },
      { name: 'Harry', party: 'Partido', voteCount: 0 },
      { name: 'Ian', party: 'Partido', voteCount: 0 },
      { name: 'Jack', party: 'Partido', voteCount: 0 },
      { name: 'Kevin', party: 'Partido', voteCount: 0 },
      { name: 'Liam', party: 'Partido', voteCount: 0 },
      { name: 'Mason', party: 'Partido', voteCount: 0 },
      { name: 'Noah', party: 'Partido', voteCount: 0 },
      { name: 'Oliver', party: 'Partido', voteCount: 0 },
      { name: 'Paul', party: 'Partido', voteCount: 0 },
    ],
  },
  {
    id: '2',
    isActive: false,
    endDate: new Date('2024-04-06').toISOString(),
    type: ElectionType.SENATORIAL,
    senators: [
      { name: 'Charlie', party: 'Partido', voteCount: 0 },
      { name: 'Dean', party: 'Partido', voteCount: 0 },
      { name: 'Edward', party: 'Partido', voteCount: 0 },
      { name: 'Frank', party: 'Partido', voteCount: 0 },
      { name: 'George', party: 'Partido', voteCount: 0 },
      { name: 'Harry', party: 'Partido', voteCount: 0 },
      { name: 'Ian', party: 'Partido', voteCount: 0 },
      { name: 'Jack', party: 'Partido', voteCount: 0 },
      { name: 'Kevin', party: 'Partido', voteCount: 0 },
      { name: 'Liam', party: 'Partido', voteCount: 0 },
      { name: 'Mason', party: 'Partido', voteCount: 0 },
      { name: 'Noah', party: 'Partido', voteCount: 0 },
      { name: 'Oliver', party: 'Partido', voteCount: 0 },
      { name: 'Paul', party: 'Partido', voteCount: 0 },
    ],
  },
];

export async function getElections(): Promise<Election[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(electionsDummyData);
    }, 1000);
  });
}

export async function getElection(
  type: ElectionType,
  year: number
): Promise<Election | null> {
  const election =
    electionsDummyData.find(
      (election) =>
        election.type === type &&
        new Date(election.endDate).getFullYear() === year
    ) || null;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(election);
    }, 1000);
  });
}
