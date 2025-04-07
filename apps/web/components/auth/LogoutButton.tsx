'use client';

import { useContext, useState } from 'react';
import { useContracts } from '@/context/ContractsProvider';
import { AuthContext, logoutUser } from '@/services/models/Auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ButtonProps, LoadingButton } from '../ui/loading-button';
import { LogOutIcon } from 'lucide-react';

export default function LogoutButton({
  className,
  variant = 'outline',
  size = 'sm',
  ...props
}: ButtonProps) {
  const router = useRouter();
  const { disconnectWallet } = useContracts();
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      disconnectWallet();
      await logoutUser();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to log out');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoadingButton
      className={className}
      size={size}
      variant={variant}
      onClick={handleLogout}
      loading={isLoading}
      {...props}
    >
      <LogOutIcon />
      Logout {currentUser?.email}
    </LoadingButton>
  );
}
