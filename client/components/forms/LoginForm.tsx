"use client";

import React, { FormEvent, useState, useEffect } from 'react';
import { KeyRound, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import authService from '../../services/api/authService';
import useAuth from '@/hooks/useAuth';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/Dashboard');
    }
  }, [user, router]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const user = await authService.login({ username, password });
      login(user.username);
      router.push('/Dashboard');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-[1rem] w-full">
      {error && <div className="text-red-500">{error}</div>}
      <label className="text-black" htmlFor="email">Email:</label>
      <div className="relative flex items-center">
        <User width={15} height={15} className="absolute left-3 text-primary" />
        <input
          type="text"
          id="email"
          name="email"
          className="text-primary py-[0.5rem] pl-10 pr-[1rem] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-primary w-full"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <label className="text-black" htmlFor="password">Password:</label>
      <div className="relative flex items-center">
        <KeyRound width={15} height={15} className="absolute left-3 text-primary" />
        <input
          type="password"
          id="password"
          name="password"
          className="text-primary py-[0.5rem] pl-10 pr-[1rem] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-2 focus:ring-primary w-full"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="py-[0.5rem] px-[1rem] text-[0.9rem] text-white rounded-[3px] bg-primary hover:text-primary hover:bg-hover transition-colors duration-200 mt-[1rem]" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;

