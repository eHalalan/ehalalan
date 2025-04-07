import { User } from 'firebase/auth';
import { WalletConnectButton } from '../contracts/WalletConnectButton';
import LogoutButton from '../auth/LogoutButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';

export default function UserDropdown({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback className="text-sm font-bold select-none">
            {user.email?.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuItem className="p-0">
          <LogoutButton
            variant="ghost"
            className="flex justify-start w-full h-full p-2"
          />
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <WalletConnectButton
            variant="ghost"
            className="flex justify-start w-full h-full p-2"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
