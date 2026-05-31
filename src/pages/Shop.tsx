/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../ProductContext';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Shop() {
  const { products } = useProducts();
  const [searchParams] = useSearchParams();
  const searchFromUrl = searchParams.get('search') || '';
  const categoryFromUrl = searchParams.get('category') || 'All';

  const [search, setSearch] = useState(searchFromUrl);
  const [category, setCategory] = useState(categoryFromUrl);

  // Sync with URL params if they change
  useEffect(() => {
    setSearch(searchFromUrl);
    setCategory(categoryFromUrl);
  }, [searchFromUrl, categoryFromUrl]);
  const [maxPrice, setMaxPrice] = useState(200);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['All', 'Men', 'Women', 'Unisex'];

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.brand.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || p.category === category;
      const matchesPrice = p.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, maxPrice, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 space-y-6 md:space-y-0 border-b border-ink/5 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Collection</h1>
          <p className="text-ink/60">Discover 100% authentic designer fragrances.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Search scents..."
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-ink/5 focus:border-primary focus:outline-hidden text-sm transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-3 w-4 h-4 text-ink/30" />
          </div>

          {/* Sort */}
          <div className="relative min-w-[160px]">
            <select
              className="w-full pl-4 pr-10 py-2.5 bg-white rounded-xl border border-ink/5 focus:border-primary focus:outline-hidden text-sm appearance-none cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-ink/30 pointer-events-none" />
          </div>

          {/* Filter Toggle Mobile */}
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center space-x-2 px-4 py-2.5 bg-white rounded-xl border border-ink/5"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 space-y-10`}>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-6">Categories</h3>
            <div className="space-y-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    category === cat ? 'bg-primary text-ink shadow-sm' : 'text-ink/60 hover:bg-white hover:text-ink'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-ink/40">Price Range</h3>
              <span className="text-sm font-bold text-secondary">Rs. {maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-secondary"
            />
            <div className="flex justify-between mt-2 text-[10px] uppercase font-bold text-ink/30">
              <span>Rs. 0</span>
              <span>Rs. 50,000+</span>
            </div>
          </div>

          <div className="bg-linear-to-br from-primary/20 to-secondary/20 p-6 rounded-3xl hidden lg:block">
            <h4 className="font-serif font-bold text-lg mb-4">Personalized Advice?</h4>
            <p className="text-sm text-ink/60 mb-6 leading-relaxed">Let us help you find the perfect scent based on your taste.</p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('essentia-open-chat'))}
              className="w-full py-3 bg-white rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-ink hover:text-white transition-all shadow-sm"
            >
              Chat With Expert
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-ink/10">
              <div className="w-16 h-16 bg-bg-soft rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-6 h-6 text-ink/20" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">No scents found</h3>
              <p className="text-ink/60">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => {setSearch(''); setCategory('All'); setMaxPrice(200);}}
                className="mt-6 font-bold text-sm text-secondary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
