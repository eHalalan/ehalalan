import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ElectionType } from '@/types/election';
import { getElection } from '@/lib/election';
import { ElectionResults } from './ElectionResults';
import { ElectionStatusBadge } from '../../ElectionStatusBadge';
import { H1, H2 } from '@/components/ui/headings';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Calendar1Icon, ExternalLinkIcon, VoteIcon } from 'lucide-react';

interface Props {
  params: Promise<{ type: string; year: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const type = resolvedParams.type as ElectionType;
  const year = parseInt(resolvedParams.year);

  return {
    title: `${year} ${type} Election`,
    description: `eHalalan Election ${year} ${type}`,
  };
}

export default async function ElectionPage({ params }: Props) {
  const resolvedParams = await params;
  const type = resolvedParams.type as ElectionType;
  const year = parseInt(resolvedParams.year);

  const election = await getElection(type, year);

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
        <Button asChild disabled={!election.isActive}>
          <Link
            href={`/elections/${election.type}/${new Date(
              election.endDate
            ).getFullYear()}/vote`}
          >
            <VoteIcon /> Vote
          </Link>
        </Button>
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

        <a
          href="#"
          target="_blank"
          className="w-fit flex items-center gap-1 hover:underline underline-offset-4"
        >
          Public Ledger <ExternalLinkIcon size={16} />
        </a>
      </div>

      <Separator className="w-full my-4" />

      <div className="mb-3">
        <H2 className="!text-3xl mb-2" anchor="results">
          Results
        </H2>
        <ElectionResults election={election} />
      </div>
    </>
  );
}
