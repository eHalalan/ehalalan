'use client';

// import Link from 'next/link';
// import { Button } from '../ui/button';
import { CustomSidebarTrigger } from './CustomSidebarTrigger';
import { WalletConnectButton } from '../contracts/WalletConnectButton';
import { useContext } from 'react';
import { AuthContext } from '@/services/models/Auth';

export function SiteHeader() {
  const { currentUser } = useContext(AuthContext);

  return (
    <header className="flex w-full">
      <div className="flex h-12 w-full items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2">
          <CustomSidebarTrigger />
        </div>

        {/* <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div> */}

        {currentUser && <WalletConnectButton />}
      </div>
    </header>
  );
}
