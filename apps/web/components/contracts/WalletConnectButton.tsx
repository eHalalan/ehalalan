import { useContracts } from '../../context/ContractsProvider';
import { ButtonProps, LoadingButton } from '../ui/loading-button';
import { WalletIcon } from 'lucide-react';

export function WalletConnectButton({
  className,
  variant = 'outline',
  size = 'sm',
  ...props
}: ButtonProps) {
  const { account, connectWallet, disconnectWallet, isLoading } =
    useContracts();

  return (
    <>
      {account ? (
        <LoadingButton
          variant={variant}
          size={size}
          onClick={disconnectWallet}
          loading={isLoading}
          className={className}
          {...props}
        >
          <WalletIcon /> {isLoading ? 'Disconnecting...' : 'Disconnect'}{' '}
          {account.slice(0, 12)}...
        </LoadingButton>
      ) : (
        <LoadingButton
          variant={variant}
          size={size}
          onClick={async () => connectWallet()}
          loading={isLoading}
          className={className}
          {...props}
        >
          <WalletIcon /> {isLoading ? 'Connecting...' : 'Connect'} Wallet
        </LoadingButton>
      )}
    </>
  );
}
