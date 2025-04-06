'use client';

import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavMain } from './NavMain';
import { AppLogo } from '../brand/app-logo';
import { AppWordmark } from '../brand/app-wordmark';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex p-2 md:p-1 py-3">
          {open ? (
            <Link href="/">
              <AppWordmark className="text-primary w-full max-w-40" />
            </Link>
          ) : (
            <Link href="/">
              <AppLogo className="text-primary w-6" />
            </Link>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
