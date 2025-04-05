'use client';

import { useState, useEffect } from 'react';
import { H1 } from '@/components/ui/headings';

export function UserGreeting() {
  const [username, setUsername] = useState<string>('User');

  useEffect(() => {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData && parsedUserData.name) {
          setUsername(parsedUserData.name);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  return (
    <H1>Welcome, {username}!</H1>
  );
}