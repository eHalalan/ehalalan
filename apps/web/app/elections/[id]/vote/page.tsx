import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getElection } from '@/lib/election';
import { Ballot } from './Ballot';
import { Button } from '@/components/ui/button';

interface Props {
  params: Promise<{
    id: string;
  }>;
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
    title: `${year} ${election.type} Election | Vote`,
    description: `Vote in eHalalan Election ${year} ${election.type}`,
  };
}

export default async function ElectionPage({ params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const election = await getElection(id);

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
          <Link href={`/elections/${election.id}`}>Go Back</Link>
        </Button>
      </div>
    );
  }

  return <Ballot election={election} />;
}
