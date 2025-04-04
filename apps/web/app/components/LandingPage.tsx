"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../assets/logo.png';

const LandingPage: React.FC = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.push('/register');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pb-20">
      <div className="flex flex-col items-center mb-4">
        <div className="inline-flex items-center">
          <Image 
            src={logo} 
            alt="eHalalan Logo" 
            width={600} 
            height={200} 
            priority
          />
        </div>
        <h1 className="text-1xl font-medium text-center mt-4">
          A decentralized election system using blockchain.
        </h1>
      </div>
      
      <div className="flex gap-4 mt-0">
        <button
          onClick={handleRegister}
          className="px-8 py-0 font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
        >
          Register
        </button>
        
        <button
          onClick={handleLogin}
          className="px-8 py-0 font-medium text-black-500 bg-white border border-green-500 rounded-full hover:bg-blue-50 transition-colors"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default LandingPage;