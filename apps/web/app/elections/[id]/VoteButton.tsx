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

    if (account) {
      checkIfVoted();
    }
  }, [account]);

  const disabled = !election.isActive || hasVoted;

  return (
    <Button
      asChild
      onClick={() => {
        if (!election.isActive) toast.error('This election is not active.');
        else if (!account) toast.error('Please connect your wallet.');
        else if (hasVoted && account) toast.error('You have already voted.');
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
