import Link from 'next/link';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { HomeIcon, UserRoundIcon, VoteIcon } from 'lucide-react';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard/',
    icon: HomeIcon,
  },
  {
    title: 'Profile',
    url: '/profile/',
    icon: UserRoundIcon,
  },
  {
    title: 'Elections',
    url: '/elections/',
    icon: VoteIcon,
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title} asChild>
              <Link href={item.url}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
