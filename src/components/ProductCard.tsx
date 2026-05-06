/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../CartContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            New
          </span>
        )}

        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 space-x-3">
          <Link
            to={`/product/${product.id}`}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-primary transition-colors text-ink shadow-lg"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-secondary transition-colors text-ink shadow-lg"
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-[10px] font-bold text-ink/40 uppercase tracking-widest mb-1">{product.brand}</p>
            <h3 className="font-serif font-bold text-lg leading-tight group-hover:text-secondary transition-colors">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h3>
          </div>
          <p className="font-bold text-lg text-secondary">Rs. {product.price.toLocaleString()}</p>
        </div>

        <div className="flex items-center space-x-1 mb-4">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-ink/60">{product.rating}</span>
          <span className="text-ink/10 h-3 border-l mx-2"></span>
          <span className="text-[10px] uppercase font-bold text-ink/40 tracking-widest">{product.category}</span>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full py-3 bg-bg-soft rounded-2xl text-sm font-bold text-ink hover:bg-linear-to-r hover:from-primary hover:to-secondary transition-all active:scale-95 flex items-center justify-center space-x-2"
        >
          <span>Add To Cart</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
