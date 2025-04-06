'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'sonner';
import { verifySignature } from '../lib/contracts/verifySignature';
import { AuthContext } from '@/services/models/Auth';
import { db } from '@/services/database';
import { collection, doc, updateDoc } from 'firebase/firestore';

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
  const { currentUser } = useContext(AuthContext);

  const connectWallet = async () => {
    const isWalletConnected = localStorage.getItem('isWalletConnected');

    try {
      setIsLoading(true);

      if (!currentUser) {
        return;
      }

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
        // Request account access if needed
        await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
      }

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

      const isVerified = localStorage.getItem('isWalletConnected');

      if (!isVerified) {
        const votersCol = collection(db, 'registry');
        const voterDoc = doc(votersCol, currentUser.uid);
        await updateDoc(voterDoc, { wallet: address });
      }

      localStorage.setItem('isWalletConnected', 'true');
      localStorage.setItem('isVerified', 'true');
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
      localStorage.removeItem('isVerified');
    } catch (error) {
      console.error('Error disconnecting to wallet:', error);
      toast.error('Error disconnecting to wallet');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if window.ethereum exists before trying to use it
    if (window.ethereum && window.ethereum.on) {
      const handleAccountsChanged = () => {
        disconnectWallet();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        if (window.ethereum && window.ethereum.removeListener) {
          window.ethereum.removeListener(
            'accountsChanged',
            handleAccountsChanged
          );
        }
      };
    }
  }, [currentUser]);

  useEffect(() => {
    const reconnectWallet = async () => {
      const isWalletConnected = localStorage.getItem('isWalletConnected');
      if (isWalletConnected === 'true') {
        await connectWallet();
      }
    };
    reconnectWallet();
  }, [currentUser]);

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
