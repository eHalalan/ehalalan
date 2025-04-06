'use client';

import Link from 'next/link';
import { AppLogo } from '@/components/brand/app-logo';
import { BallotHero } from './BallotHero';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <div className="my-8 md:my-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center gap-1">
        <div className="w-full flex items-center justify-center gap-1">
          <div className="text-primary min-w-12 w-12 md:w-20 mt-2 motion-preset-slide-up-right -motion-rotate-in-45 motion-duration-[1.5s]">
            <AppLogo className="motion-preset-seesaw-lg motion-delay-[1.5s]" />
          </div>
          <h1 className="text-primary text-[48pt] md:text-[80pt] font-bold leading-none motion-preset-slide-down motion-duration-[1.5s]">
            Halalan
          </h1>
        </div>

        <p className="text-center text-lg font-semibold motion-preset-slide-up motion-duration-[1.5s]">
          Where your vote truly matters.
        </p>

        <div className="mt-4 flex gap-2 items-center">
          <Button
            variant="outline"
            className="border-2 border-primary motion-preset-slide-up motion-delay-100  motion-duration-[1.5s]"
            asChild
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            className="motion-preset-slide-up motion-delay-200  motion-duration-[1.5s]"
            asChild
          >
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>

      <div className="w-full flex gap-2 items-center justify-center">
        <BallotHero className="motion-preset-slide-left -motion-rotate-in-45 motion-duration-[2.5s]" />
      </div>
    </div>
  );
}
