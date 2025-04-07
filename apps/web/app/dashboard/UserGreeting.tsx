'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/services/models/Auth';
import { AppLogo } from '@/components/brand/app-logo';
import { H1 } from '@/components/ui/headings';
import { getVoter } from '@/lib/voters';
import { VoterWithWallet } from '@/services/models/VoterDetails';

export function UserGreeting() {
  const { currentUser } = useContext(AuthContext);
  const [voter, setVoter] = useState<VoterWithWallet | null>(null);

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      getVoter(currentUser.uid).then((voter) => setVoter(voter));
    }
  }, [currentUser]);

  return (
    <H1 className="flex flex-wrap items-baseline justify-start gap-2 motion-preset-slide-down">
      <span className="!text-5xl flex items-center">
        W
        <AppLogo className="w-9 mt-1 motion-preset-seesaw-lg motion-delay-500" />
        lcome,
      </span>
      <span className="text-4xl">{voter?.fullName || 'whoever you are'}!</span>
    </H1>
  );
}
