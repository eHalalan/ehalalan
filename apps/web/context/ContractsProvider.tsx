'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'sonner';
import { verifySignature } from '../lib/contracts/verifySignature';

interface ContractsContextType {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  account: string;
  isLoading: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const ContractsContext = createContext<ContractsContextType | undefined>(
  undefined
);

export const useContracts = () => {
  const context = useContext(ContractsContext);
  if (!context) {
    throw new Error('useContracts must be used within a ContractsProvider');
  }
  return context;
};

export const ContractsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    const isWalletConnected = localStorage.getItem('isWalletConnected');

    try {
      setIsLoading(true);

      if (!window.ethereum) {
        toast.error(
          'Please ensure that an Ethereum wallet is installed and try again.'
        );
        return;
      }

      const newProvider = new ethers.BrowserProvider(window.ethereum);
      if (!newProvider) {
        toast.error(
          'Please ensure that an Ethereum wallet is installed and try again.'
        );
        return;
      }
      setProvider(newProvider);

      // Check if an account is already available
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (accounts.length === 0) {
        toast.error('Please log in to your Ethereum wallet');
        return;
      }

      // Request account access if needed
      window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const newSigner = await newProvider.getSigner();
      setSigner(newSigner);

      const address = await newSigner.getAddress();
      setAccount(address);

      // Sign a message for verification
      const message = `Please sign this message to authenticate: '${address}'`;
      if (!isWalletConnected) {
        const signature = await newSigner.signMessage(message);
        if (!(await verifySignature(address, message, signature))) {
          toast.error('Invalid signature. Try again.');
          return;
        }
      }

      localStorage.setItem('isWalletConnected', 'true');
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      toast.error('Error connecting to wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setIsLoading(true);
    try {
      if (provider) provider.destroy();
      setAccount('');
      setSigner(null);
      setProvider(null);
      localStorage.removeItem('isWalletConnected');
    } catch (error) {
      console.error('Error disconnecting to wallet:', error);
      toast.error('Error disconnecting to wallet');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        localStorage.removeItem('isWalletConnected');
        setAccount('');
        setSigner(null);
        setProvider(null);
      } else {
        setAccount(accounts[0]);
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  useEffect(() => {
    const reconnectWallet = async () => {
      const isWalletConnected = localStorage.getItem('isWalletConnected');
      if (isWalletConnected === 'true') {
        await connectWallet();
      }
    };
    reconnectWallet();
  }, []);

  return (
    <ContractsContext.Provider
      value={{
        provider,
        signer,
        account,
        isLoading,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </ContractsContext.Provider>
  );
};
