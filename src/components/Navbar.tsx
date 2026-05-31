/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Lock } from 'lucide-react';
import { useCart } from '../CartContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold tracking-tight text-ink">Essentia Belle</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-secondary transition-colors">Home</Link>
            <Link to="/shop" className="text-sm font-medium hover:text-secondary transition-colors">Shop</Link>
            <Link to="/scent-finder" className="text-sm font-medium hover:text-secondary transition-colors">Scent Finder</Link>
            <Link to="/custom-blend" className="text-sm font-medium hover:text-secondary transition-colors">Custom Blend</Link>
            <Link to="/admin" className="text-sm font-semibold text-secondary hover:underline flex items-center gap-1.5 transition-colors">
              <Lock className="w-3.5 h-3.5" /> Admin
            </Link>
          </div>

          {/* Desktop Tools */}
          <div className="hidden md:flex items-center space-x-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search scents..."
                className="pl-10 pr-4 py-2 rounded-full bg-bg-soft text-sm focus:outline-hidden border border-transparent focus:border-primary w-48 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-ink/40" />
            </form>
            <Link to="/auth" className="hover:text-secondary transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="relative group hover:text-secondary transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative group">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-ink/5 bg-white overflow-hidden shadow-xl"
          >
            <div className="px-4 py-6 space-y-4">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search scents..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-bg-soft text-sm focus:outline-hidden"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-ink/40" />
              </form>
              <div className="flex flex-col space-y-4 pt-2">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Home</Link>
                <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Shop</Link>
                <Link to="/scent-finder" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Scent Finder</Link>
                <Link to="/custom-blend" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Custom Blend</Link>
                <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">About</Link>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Contact</Link>
                <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">My Account</Link>
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold text-secondary flex items-center gap-2 pt-2 border-t border-ink/5">
                  <Lock className="w-4 h-4" /> Admin Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
