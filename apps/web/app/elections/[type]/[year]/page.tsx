import React from 'react';
import Link from 'next/link';
import { ElectionType } from '@/types/election';
import { getElection } from '@/lib/election';
import { ElectionStatusBadge } from '../../ElectionStatusBadge';
import { H1 } from '@/components/ui/headings';
import { Button } from '@/components/ui/button';
import { Calendar1Icon, VoteIcon } from 'lucide-react';

interface Props {
  params: Promise<{ type: string; year: string }>;
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
          {election.endDate.getFullYear()} {election.type} Election
        </H1>
        <Button asChild disabled={!election.isActive}>
          <Link
            href={`/elections/${
              election.type
            }/${election.endDate.getFullYear()}/vote`}
          >
            <VoteIcon /> Vote
          </Link>
        </Button>
      </div>

      <div className="mb-5 flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <ElectionStatusBadge election={election} />

          <div className="flex items-center gap-1">
            <Calendar1Icon size={16} />
            Ends in{' '}
            {election.endDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </div>
      </div>
    </>
  );
}
