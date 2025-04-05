export enum ElectionType {
  NATIONAL = 'National',
  SENATORIAL = 'Senatorial',
  Local = 'Local',
}

export interface Election {
  id: number;
  isActive: boolean;
  endDate: Date;
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
