/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful auth
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white p-10 rounded-[40px] shadow-2xl border border-ink/5"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold mb-3">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-ink/60">Join the Essentia Belle boutique today</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-6 py-4 bg-bg-soft rounded-2xl border border-transparent focus:border-primary focus:outline-hidden transition-all"
                />
                <User className="absolute left-4 top-4 w-5 h-5 text-ink/30" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <input
              required
              type="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-6 py-4 bg-bg-soft rounded-2xl border border-transparent focus:border-primary focus:outline-hidden transition-all"
            />
            <Mail className="absolute left-4 top-4 w-5 h-5 text-ink/30" />
          </div>

          <div className="relative">
            <input
              required
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-6 py-4 bg-bg-soft rounded-2xl border border-transparent focus:border-primary focus:outline-hidden transition-all"
            />
            <Lock className="absolute left-4 top-4 w-5 h-5 text-ink/30" />
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <button type="button" className="text-xs font-bold text-ink/40 hover:text-secondary">Forgot Password?</button>
            </div>
          )}

          <button
            type="submit"
            className="btn-pastel w-full py-5 text-lg flex items-center justify-center space-x-2"
          >
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center pt-8 border-t border-ink/5">
          <p className="text-sm text-ink/60">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-secondary hover:underline transition-all"
            >
              {isLogin ? 'Register Now' : 'Sign In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
