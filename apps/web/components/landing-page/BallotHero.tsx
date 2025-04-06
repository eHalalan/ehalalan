'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { BallotCheckbox } from '@/app/elections/[type]/[year]/vote/BallotCheckbox';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function BallotHero({ className }: { className?: string }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsChecked(true);
    }, 1000);
  }, []);

  return (
    <div
      className={cn(
        `min-w-60 max-w-120 p-4 inset-0 rounded-lg shadow-md bg-background`,
        className
      )}
    >
      <div className="text-xl text-muted-foreground mb-6 pb-2 pl-4 border-b font-bold">
        <Link
          href="/elections"
          className="hover:underline underline-offset-4 flex items-center justify-between gap-1"
        >
          Online Ballot <ExternalLink size={16} />
        </Link>
      </div>

      <div className="p-6 space-y-2">
        <div className="relative flex items-center gap-3 mb-3">
          <BallotCheckbox
            checked={isChecked}
            onCheckedChange={() => setIsChecked(!isChecked)}
          />
          <div className="font-medium">{new Date().getFullYear()}. Halalan</div>
        </div>
        {new Array(8).fill(0).map((_, index) => (
          <div className="flex items-center gap-3" key={index}>
            <BallotCheckbox checked={false} className="border-border" />
            <Skeleton className="h-2 w-36 md:w-64 rounded"></Skeleton>
          </div>
        ))}
      </div>
    </div>
  );
}
