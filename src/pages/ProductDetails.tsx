/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../ProductContext';
import { useCart } from '../CartContext';
import { Star, ArrowLeft, ShoppingBag, Truck, RotateCcw, ShieldCheck, Heart, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-serif font-bold mb-6">Product Not Found</h2>
        <Link to="/shop" className="btn-pastel inline-block">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optional: Show some success message or redirect to cart
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/shop" className="inline-flex items-center space-x-2 text-sm font-bold text-ink/40 hover:text-ink transition-colors mb-12 group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>BACK TO SHOP</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative rounded-[40px] overflow-hidden bg-white shadow-xs border border-ink/5"
          >
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.isNew && (
                <span className="absolute top-8 left-8 bg-black text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                  New Arrival
                </span>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10"
        >
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-ink/60">{product.rating} (124 reviews)</span>
            </div>
            <p className="text-sm font-black text-secondary tracking-[0.2em] uppercase mb-4">{product.brand}</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-ink mb-6">{product.name}</h1>
            <p className="text-3xl font-light text-secondary">Rs. {product.price.toLocaleString()}</p>
          </div>

          <p className="text-ink/60 text-lg leading-relaxed max-w-xl">
            {product.description}
          </p>

          <div className="space-y-6 bg-white p-8 rounded-3xl shadow-xs border border-ink/5">
            <h3 className="text-xs font-black uppercase tracking-widest text-ink/40">Scent Notes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <p className="text-[10px] font-bold text-secondary uppercase mb-2">Top</p>
                <div className="flex flex-wrap gap-2">
                  {product.notes.top.map(note => <span key={note} className="text-sm text-ink/80">{note}</span>)}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-secondary uppercase mb-2">Heart</p>
                <div className="flex flex-wrap gap-2">
                  {product.notes.middle.map(note => <span key={note} className="text-sm text-ink/80">{note}</span>)}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-secondary uppercase mb-2">Base</p>
                <div className="flex flex-wrap gap-2">
                  {product.notes.base.map(note => <span key={note} className="text-sm text-ink/80">{note}</span>)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
            <div className="flex items-center bg-bg-soft rounded-full px-6 py-2 border border-ink/5">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:text-secondary transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-bold">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:text-secondary transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="flex-1 btn-pastel py-5 flex items-center justify-center space-x-3 text-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart — Rs. {(product.price * quantity).toLocaleString()}</span>
            </button>

            <button className="w-16 h-16 rounded-full border border-ink/10 flex items-center justify-center hover:bg-red-50 hover:border-red-100 group transition-all">
              <Heart className="w-6 h-6 group-hover:fill-red-400 group-hover:text-red-400 transition-all" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-ink/5">
            <div className="flex items-center space-x-4 border border-ink/5 p-4 rounded-2xl">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-bold">Fast Delivery</p>
                <p className="text-xs text-ink/60">Free over Rs. 10,000</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 border border-ink/5 p-4 rounded-2xl">
              <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-bold">Safe Payments</p>
                <p className="text-xs text-ink/60">100% Secure Transaction</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
