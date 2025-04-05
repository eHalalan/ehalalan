import { z } from 'zod';

export const electionVoteSchema = z.object({
  presidents: z.array(z.number()).optional(),
  vicePresidents: z.array(z.number()).optional(),
  senators: z.array(z.number()).length(12, 'Select exactly 12 senators'),
});

export type ElectionVote = z.infer<typeof electionVoteSchema>;
