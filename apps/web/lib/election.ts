import { Election, ElectionType } from '@/types/election';

const electionsDummyData: Election[] = [
  {
    id: '1',
    isActive: true,
    endDate: new Date('2025-04-06').toISOString(),
    type: ElectionType.NATIONAL,
    presidents: [
      { name: 'Alex', party: 'Partido', voteCount: 400 },
      { name: 'Bob', party: 'Partido', voteCount: 600 },
      { name: 'Charlie', party: 'Partido', voteCount: 100 },
      { name: 'Dean', party: 'Partido', voteCount: 50 },
    ],
    vicePresidents: [
      { name: 'Alex', party: 'Partido', voteCount: 400 },
      { name: 'Bob', party: 'Partido', voteCount: 600 },
      { name: 'Charlie', party: 'Partido', voteCount: 100 },
      { name: 'Dean', party: 'Partido', voteCount: 50 },
      { name: 'Edward', party: 'Partido', voteCount: 50 },
      { name: 'Frank', party: 'Partido', voteCount: 20 },
      { name: 'George', party: 'Partido', voteCount: 20 },
      { name: 'Harry', party: 'Partido', voteCount: 300 },
    ],
    senators: [
      { name: 'Alex', party: 'Partido', voteCount: 400 },
      { name: 'Bob', party: 'Partido', voteCount: 600 },
      { name: 'Charlie', party: 'Partido', voteCount: 100 },
      { name: 'Dean', party: 'Partido', voteCount: 50 },
      { name: 'Edward', party: 'Partido', voteCount: 50 },
      { name: 'Frank', party: 'Partido', voteCount: 20 },
      { name: 'George', party: 'Partido', voteCount: 20 },
      { name: 'Harry', party: 'Partido', voteCount: 300 },
      { name: 'Ian', party: 'Partido', voteCount: 400 },
      { name: 'Jack', party: 'Partido', voteCount: 100 },
      { name: 'Kevin', party: 'Partido', voteCount: 150 },
      { name: 'Liam', party: 'Partido', voteCount: 350 },
      { name: 'Mason', party: 'Partido', voteCount: 100 },
      { name: 'Noah', party: 'Partido', voteCount: 90 },
      { name: 'Oliver', party: 'Partido', voteCount: 80 },
      { name: 'Paul', party: 'Partido', voteCount: 100 },
      { name: 'Quentin', party: 'Partido', voteCount: 100 },
      { name: 'Shaina', party: 'Partido', voteCount: 60 },
      { name: 'Tiffany', party: 'Partido', voteCount: 100 },
      { name: 'Ulysses', party: 'Partido', voteCount: 40 },
      { name: 'Victor', party: 'Partido', voteCount: 100 },
      { name: 'William', party: 'Partido', voteCount: 10 },
      { name: 'Xavier', party: 'Partido', voteCount: 100 },
      { name: 'Yang', party: 'Partido', voteCount: 5 },
      { name: 'Zachary', party: 'Partido', voteCount: 300 },
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
