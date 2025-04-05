import React from 'react';
import Link from 'next/link';
import { ElectionType } from '@/types/election';
import { getElection } from '@/lib/election';
import { Ballot } from './Ballot';
import { Button } from '@/components/ui/button';

interface Props {
  params: Promise<{
    type: string;
    year: string;
  }>;
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

  if (!election.isActive) {
    return (
      <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
        <h2 className="text-xl font-bold">Election has ended</h2>
        <Button asChild>
          <Link
            href={`/elections/${
              election.type
            }/${election.endDate.getFullYear()}`}
          >
            Go Back
          </Link>
        </Button>
      </div>
    );
  }

  return <Ballot election={election} />;
}
