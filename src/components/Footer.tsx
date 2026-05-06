/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-ink/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-serif font-bold tracking-tight mb-4 inline-block">Essentia Belle</Link>
            <p className="text-ink/60 text-sm leading-relaxed mb-6">
              Curating luxury scents that evoke emotions and memories. Crafted with precision and passion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-secondary transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-secondary transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-sm text-ink/60 hover:text-secondary transition-colors">Our Collection</Link></li>
              <li><Link to="/shop?category=Women" className="text-sm text-ink/60 hover:text-secondary transition-colors">Women's Perfume</Link></li>
              <li><Link to="/shop?category=Men" className="text-sm text-ink/60 hover:text-secondary transition-colors">Men's Fragrances</Link></li>
              <li><Link to="/shop?category=Unisex" className="text-sm text-ink/60 hover:text-secondary transition-colors">Unisex Scents</Link></li>
            </ul>
          </div>

          {/* Shop Info */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Customer Care</h4>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-sm text-ink/60 hover:text-secondary transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="text-sm text-ink/60 hover:text-secondary transition-colors">About Essentia Belle</Link></li>
              <li><a href="#" className="text-sm text-ink/60 hover:text-secondary transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-sm text-ink/60 hover:text-secondary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-ink/60 text-sm mb-4">Subscribe to receive updates and exclusive offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-bg-soft border-transparent border focus:border-primary rounded-l-full px-4 py-2 text-sm w-full focus:outline-hidden transition-all"
              />
              <button
                type="submit"
                className="bg-ink text-white px-4 py-2 rounded-r-full text-sm font-medium hover:bg-ink/80 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-ink/5 pt-8 text-center">
          <p className="text-xs text-ink/40 tracking-wider">
            © 2026 ESSENTIA BELLE BOUTIQUE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
