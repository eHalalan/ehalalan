export enum ElectionType {
  NATIONAL = 'National',
  SENATORIAL = 'Senatorial',
}

export interface Election {
  id: string;
  isActive: boolean;
  endDate: string;
  type: ElectionType;
  presidents?: Candidate[];
  vicePresidents?: Candidate[];
  senators: Candidate[];
}

export interface Candidate {
  name: string;
  party: string;
  voteCount: number;
}

export interface VoteData {
  presidentVote: number;
  vicePresidentVote: number;
  senatorVotes: number[];
}
