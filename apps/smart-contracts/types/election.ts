// This can be outside both the apps but im not sure if it might break some things so lets just copy and paste for now hehe

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
