/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Truck, ShieldCheck, CheckCircle2, ArrowLeft, Banknote, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isFinished, setIsFinished] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFinished(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (cart.length === 0 && !isFinished) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="text-4xl font-serif font-bold mb-4">Empty Checkout</h2>
        <Link to="/shop" className="btn-pastel inline-block">Go to Shop</Link>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-[40px] p-16 shadow-2xl inline-block max-w-xl mx-auto border border-ink/5"
        >
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xs">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-serif font-bold mb-4">Order Placed!</h2>
          <p className="text-link/60 mb-8 leading-relaxed">
            Thank you for choosing Essentia Belle. Your luxury scent is being prepared for shipment. You will receive an email shortly with your order details.
          </p>
          <p className="text-xs font-bold text-ink/30 tracking-[0.2em] uppercase">Redirecting to Homepage...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/cart" className="inline-flex items-center space-x-2 text-sm font-bold text-ink/40 hover:text-ink mb-12 group transition-colors">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>BACK TO CART</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-serif font-bold mb-8 flex items-center space-x-4">
              <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-base font-sans">1</span>
              <span>Shipping Information</span>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  placeholder="First Name"
                  className="w-full bg-white border border-ink/5 rounded-xl px-6 py-4 focus:outline-hidden focus:border-secondary transition-all"
                />
                <input
                  required
                  type="text"
                  placeholder="Last Name"
                  className="w-full bg-white border border-ink/5 rounded-xl px-6 py-4 focus:outline-hidden focus:border-secondary transition-all"
                />
              </div>
              <input
                required
                type="email"
                placeholder="Email Address"
                className="w-full bg-white border border-ink/5 rounded-xl px-6 py-4 focus:outline-hidden focus:border-secondary transition-all"
              />
              <input
                required
                type="text"
                placeholder="Complete Address"
                className="w-full bg-white border border-ink/5 rounded-xl px-6 py-4 focus:outline-hidden focus:border-secondary transition-all"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  placeholder="City"
                  className="w-full bg-white border border-ink/5 rounded-xl px-6 py-4 focus:outline-hidden focus:border-secondary transition-all"
                />
                <input
                  required
                  type="text"
                  placeholder="Zip Code"
                  className="w-full bg-white border border-ink/5 rounded-xl px-6 py-4 focus:outline-hidden focus:border-secondary transition-all"
                />
              </div>

              <div className="pt-8">
                <h2 className="text-3xl font-serif font-bold mb-8 flex items-center space-x-4">
                   <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-base font-sans">2</span>
                   <span>Payment Method</span>
                </h2>
                
                <div className="bg-bg-soft border-l-4 border-secondary p-6 rounded-2xl relative overflow-hidden">
                  <Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-secondary/10 rotate-12" />
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                      <Banknote className="w-6 h-6 text-secondary" />
                      <span className="font-bold text-xl">Cash on Delivery</span>
                    </div>
                    <h4 className="font-bold text-secondary mb-2 flex items-center space-x-2">
                       <CheckCircle2 className="w-4 h-4" />
                       <span>Special Transparency Program</span>
                    </h4>
                    <p className="text-ink font-medium leading-relaxed italic">
                       "Open the package, use the fragrance, and if you truly like the product, then pay at your doorstep."
                    </p>
                    <p className="text-xs text-ink/40 mt-4 uppercase font-bold tracking-widest">
                       Essentia Trust Guarantee — No hidden fees
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn-pastel w-full py-5 text-lg shadow-xl mt-8"
              >
                Confirm Order — Cash on Delivery
              </button>
            </form>
          </section>
        </div>

        <div className="lg:sticky lg:top-32 h-fit">
          <div className="bg-white rounded-[40px] p-10 shadow-xl border border-ink/5 space-y-8">
            <h3 className="text-2xl font-serif font-bold">Order Summary</h3>
            <div className="max-h-60 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex space-x-4 items-center">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{item.name}</p>
                    <p className="text-xs text-ink/40">Qty: {item.quantity} × Rs. {item.price.toLocaleString()}</p>
                  </div>
                  <p className="font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-ink/5 pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">Subtotal</span>
                <span className="font-bold">Rs. {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">Shipping</span>
                <span className="font-bold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-ink/5">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-serif font-bold text-secondary">Rs. {cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-3 text-xs text-ink/60">
                <Truck className="w-4 h-4 text-secondary" />
                <span>Express Worldwide Shipping Included</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-ink/60">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Encrypted SSL Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
