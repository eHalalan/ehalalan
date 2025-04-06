'use client';

import React, { useEffect, useState } from 'react';
import { VoteIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Election } from '@/types/election';
import { hasAlreadyVoted } from '@/services/ballot';
import { useContracts } from '@/context/ContractsProvider';

interface PropsInterface {
  election: Election;
}

function VoteButton({ election }: PropsInterface) {
  const { account } = useContracts();

  const [hasVoted, setHasVoted] = useState(true);

  useEffect(() => {
    async function checkIfVoted() {
      const res = await hasAlreadyVoted(election.id, account);
      setHasVoted(res);
    }

    checkIfVoted();
  }, []);

  if (hasVoted) {
    return <></>;
  }

  return (
    <Button asChild disabled={!election.isActive}>
      <Link href={`/elections/${election.id}/vote`}>
        <VoteIcon /> Vote
      </Link>
    </Button>
  );
}

export default VoteButton;
