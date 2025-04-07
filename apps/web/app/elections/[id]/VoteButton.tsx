'use client';

import React, { useEffect, useState } from 'react';
import { VoteIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Election } from '@/types/election';
import { hasAlreadyVoted } from '@/services/ballot';
import { useContracts } from '@/context/ContractsProvider';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

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

  const disabled = !election.isActive || hasVoted;

  return (
    <Button
      asChild
      onClick={() => {
        if (hasVoted) toast.error('You have already voted.');
        if (!election.isActive) toast.error('This election is not active.');
      }}
      className={cn(disabled && 'bg-gray-400 hover:bg-gray-400/50')}
    >
      <Link href={disabled ? '#' : `/elections/${election.id}/vote`}>
        <VoteIcon /> Vote
      </Link>
    </Button>
  );
}

export default VoteButton;
