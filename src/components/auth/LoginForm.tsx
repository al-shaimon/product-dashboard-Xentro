'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>();
  const { login } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data?.email, data?.password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoCredentials = async () => {
    try {
      setIsLoading(true);
      // Clear previous credentials
      setValue('email', '');
      setValue('password', '');

      // Fetch a random user from JSONPlaceholder
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();
      const randomUser = users[Math.floor(Math.random() * users.length)];

      // Set email and use zipcode as password
      setValue('email', randomUser.email);
      setValue('password', randomUser.address.zipcode);

      toast.success('Demo credentials loaded!');
    } catch (error) {
      console.error('Error loading demo credentials:', error);
      toast.error('Failed to load demo credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full max-w-md"
    >
      <div>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            type="email"
            className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Email"
          />
        </div>
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 5,
                message: 'Password must be at least 5 characters',
              },
            })}
            type="password"
            className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Password"
          />
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <div className="space-y-3">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg 
                   hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:ring-offset-2 transform transition-all duration-300 
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center"
            >
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </motion.div>
          ) : (
            'Sign In'
          )}
        </button>

        <button
          type="button"
          onClick={handleDemoCredentials}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-gray-500 
                   focus:ring-offset-2 transform transition-all duration-300 
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Loading...' : 'Use Demo Credentials'}
        </button>
      </div>
    </motion.form>
  );
}
