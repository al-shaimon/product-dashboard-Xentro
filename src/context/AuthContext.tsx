/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  }, [router]);

  const login = async (email: string, password: string) => {
    try {
      // Fetch users from JSONPlaceholder
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users: User[] = await response.json();

      // Find user with matching email
      const matchedUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase());

      if (!matchedUser) {
        throw new Error('User not found');
      }

      // In a real app, we will verify the password here
      // For demo purposes, we'll accept any password for the matching email

      // Store auth data
      localStorage.setItem('authToken', 'token');
      localStorage.setItem('user', JSON.stringify(matchedUser));
      setUser(matchedUser);
      setIsAuthenticated(true);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid email or password');
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // Check if email already exists
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users: User[] = await response.json();

      if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('Email already exists');
      }

      // In a real app, we will create a new user here
      // For demo, we'll create a mock user
      const newUser = {
        id: users.length + 1,
        name,
        email,
      };

      // Store auth data
      localStorage.setItem('authToken', 'token');
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);
      router.push('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
