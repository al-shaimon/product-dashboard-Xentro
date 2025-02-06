'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthLayout() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Side - Image/Illustration */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white"
          >
            <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
            <p className="mb-8">Enter your personal details to start your journey with us</p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 
                       transition-all duration-300 transform hover:scale-105"
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </button>
          </motion.div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col justify-center"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">
                {isLogin ? 'Sign In' : 'Create Account'}
              </h2>
              {isLogin ? <LoginForm /> : <SignupForm />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
