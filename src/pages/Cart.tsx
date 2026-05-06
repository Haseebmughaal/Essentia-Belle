/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <ShoppingBag className="w-10 h-10 text-ink/20" />
        </div>
        <h2 className="text-4xl font-serif font-bold mb-4">Your cart is empty</h2>
        <p className="text-ink/60 mb-10 max-w-sm mx-auto">Looks like you haven't added any fragrances yet. Let's find some for you!</p>
        <Link to="/shop" className="btn-pastel px-12 py-4 shadow-xl inline-block">Explore Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold">Shopping Bag</h1>
        <p className="text-ink/60 font-medium">{cart.length} unique scents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-8 shadow-xs border border-ink/5"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-bg-soft flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{item.brand}</p>
                      <h3 className="text-xl font-serif font-bold mt-1">
                        <Link to={`/product/${item.id}`} className="hover:text-secondary transition-colors">{item.name}</Link>
                      </h3>
                      <p className="text-xs text-ink/40 mt-1">{item.category}</p>
                    </div>
                    <p className="text-xl font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-ink/5">
                    <div className="flex items-center bg-bg-soft rounded-full px-4 py-1 border border-ink/5">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-secondary transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-secondary transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-ink/30 hover:text-red-500 transition-colors flex items-center space-x-2 text-xs font-bold"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">REMOVE</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Link to="/shop" className="inline-flex items-center space-x-2 text-sm font-bold text-ink/40 hover:text-ink pt-4 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>CONTINUE SHOPPING</span>
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-white rounded-[40px] p-8 shadow-xl border border-ink/5 space-y-8">
            <h3 className="text-2xl font-serif font-bold">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">Subtotal</span>
                <span className="font-bold">Rs. {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">Shipping</span>
                <span className="font-bold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">Estimated Tax</span>
                <span className="font-bold text-ink/60">Rs. 0</span>
              </div>
              <div className="border-t border-ink/5 pt-4 flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-serif font-bold text-secondary">Rs. {cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-bg-soft rounded-2xl p-4 border border-dashed border-ink/10">
              <p className="text-[10px] font-bold text-ink/40 uppercase tracking-widest mb-2">Shipping Information</p>
              <p className="text-xs text-ink/60 leading-relaxed">
                Free standard shipping worldwide on orders over Rs. 10,000. Delivery estimated in 3-5 business days.
              </p>
            </div>

            <Link to="/checkout" className="btn-pastel w-full py-5 flex items-center justify-center space-x-3 text-lg">
              <span>Checkout Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="pt-4 flex justify-center space-x-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-30 grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-30 grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-30 grayscale" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
