'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../assets/logo.png';
import { formToVoterDetails } from '@/services/models/VoterDetails';
import { registerUser } from '@/services/models/Auth';
import { registerVoterDetails } from '@/services/DAO/votersRegistry';

interface FormData {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  placeOfBirth: string;
  agreeTerms: boolean;
}

const RegistrationForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    placeOfBirth: '',
    agreeTerms: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!formData) return;

    try {
      const email = formData.email;
      const password = formData.password;

      const uid = await registerUser({ email, password });
      const updates = formToVoterDetails(formData, uid);

      const voter = await registerVoterDetails(updates);
      if (voter) {
        // Redirect to dashboard or protected page
        router.push('/dashboard');
      }
      // insert desired effect for failed registration
    } catch (error) {
      console.error('Update failed:', error);
    }

    // Here you would typically register the user and redirect to login
  };

  const navigateToLogin = (): void => {
    router.push('/login'); // Adjust this path to match your app's routing
  };

  return (
    <div className="flex flex-col items-center">
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
        <h2 className="text-xl font-bold mb-6">Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700 mb-0">Email address</label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 mb-0">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 mb-0">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 mb-0">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 mb-0">Date of Birth</label>
            <input
              type="text"
              name="dateOfBirth"
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="YYYY - MM - DD"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 mb-0">Place of Birth</label>
            <input
              type="text"
              name="placeOfBirth"
              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your place of birth"
              value={formData.placeOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                className="mr-2"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <span className="text-xs text-gray-700">
                I hereby agree that all information above are correct.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register
          </button>

          <div className="text-center mt-4 text-sm">
            Already have an account?{' '}
            <a
              href="#"
              onClick={navigateToLogin}
              className="text-blue-500 hover:underline"
            >
              Log in
            </a>
            .
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
