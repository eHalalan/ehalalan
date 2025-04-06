import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getElection } from '@/lib/election';
import { ElectionResults } from './ElectionResults';
import { ElectionStatusBadge } from '../ElectionStatusBadge';
import { H1, H2 } from '@/components/ui/headings';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Calendar1Icon } from 'lucide-react';
import { getNumVoted } from '@/services/ballot';
import { getNumRegisteredVoters } from '@/services/DAO/votersRegistry';
import VoteButton from './VoteButton';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const election = await getElection(id);

  if (!election) {
    return {
      title: 'Error',
      description: 'Election does not exist.',
    };
  }
  const year = new Date(election.endDate).getFullYear();

  return {
    title: `${year} ${election.type} Election`,
    description: `eHalalan Election ${year} ${election.type}`,
  };
}

export default async function ElectionPage({ params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const election = await getElection(id);
  const numVoted = await getNumVoted(id);
  const registered = await getNumRegisteredVoters();

  if (!election) {
    return (
      <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
        <h2 className="text-xl font-bold">Election not found</h2>
        <Button asChild>
          <Link href="/elections">Go Back</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-between gap-2">
        <H1 className="!text-4xl">
          {new Date(election.endDate).getFullYear()} {election.type} Election
        </H1>
        <VoteButton election={election} />
      </div>

      <div className="mb-3 flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <ElectionStatusBadge election={election} />

          <div className="flex items-center gap-1">
            <Calendar1Icon size={16} />
            Ends in{' '}
            {new Date(election.endDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </div>
      </div>

      <Separator className="w-full my-4" />

      <div className="mb-3">
        <H2 className="!text-3xl mb-2" anchor="results">
          Results
        </H2>
        <ElectionResults
          election={election}
          voted={numVoted}
          registered={registered}
        />
      </div>
    </>
  );
}
