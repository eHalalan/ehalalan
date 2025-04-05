'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../assets/logo.png';
// import { registerVoter } from '../../services/votersRegistry';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Login submitted:', loginData);
    // Here you would typically authenticate the user
  };

  const navigateToRegister = (): void => {
    router.push('/register'); // Adjust this path to match your app's routing
  };

  // const exampleVoterAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'; // Sample Ethereum address
  // const exampleFullName = 'Maria Santos';

  // // Execute the registration
  // registerVoter(exampleVoterAddress, exampleFullName)
  //   .then((docRef) => {
  //     console.log(`Voter registered with ID: ${docRef.id}`);
  //     console.log('Details:', {
  //       address: exampleVoterAddress,
  //       name: exampleFullName,
  //       timestamp: new Date().toISOString(),
  //     });
  //   })
  //   .catch((error) => {
  //     console.error('Registration failed:', error);
  //   });

  // registerVoter(exampleVoterAddress, exampleFullName);

  return (
    <div className="w-full flex flex-col items-center p-4 pt-5">
      <div className="text-center mb-4">
        <div className="inline-flex items-center">
          <Image
            src={logo}
            alt="eHalalan Logo"
            width={300}
            height={100}
            priority
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md px-15 py-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-6">Log In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-0">Email address</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-0">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                className="mr-2"
                checked={loginData.rememberMe}
                onChange={handleChange}
              />
              <span className="text-xs text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-xs text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Log In
          </button>

          <div className="text-center mt-4 text-sm">
            Don&apos;t have an account?{' '}
            <a
              href="#"
              onClick={navigateToRegister}
              className="text-blue-500 hover:underline"
            >
              Register
            </a>
            .
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
