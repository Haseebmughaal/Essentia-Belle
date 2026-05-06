/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../ProductContext';
import ProductCard from '../components/ProductCard';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Leaf, Sparkles, ShieldCheck, Beaker, Wind, Zap } from 'lucide-react';

export default function Home() {
  const { products } = useProducts();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const featured = products.filter(p => p.isFeatured);
  const newArrivals = products.filter(p => p.isNew);

  return (
    <div ref={containerRef} className="space-y-24 pb-24 overflow-hidden">
      {/* 3D Immersive Hero Section */}
      <section className="relative h-[100vh] flex items-center overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#f8f9fa]"></div>
          <motion.div 
            style={{ y: y1, opacity }}
            className="absolute top-[10%] right-[15%] w-96 h-96 bg-primary/30 rounded-full blur-[100px]"
          />
          <motion.div 
            style={{ y: y2, opacity }}
            className="absolute bottom-[20%] left-[10%] w-80 h-80 bg-secondary/20 rounded-full blur-[120px]"
          />
          
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-sm border border-secondary/20">
                The Art of Perfumery
              </span>
              <h1 className="text-7xl md:text-[110px] font-serif font-bold text-ink leading-[0.85] mb-10 tracking-tighter">
                Essentia <br /> 
                <span className="italic text-secondary font-light">Belle</span>
              </h1>
              <p className="text-xl text-ink/60 mb-10 leading-relaxed font-light max-w-md">
                Find your signature scent from our curated boutique of exquisite, artisanal fragrances.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/shop" className="btn-pastel flex items-center justify-center space-x-2 px-10 py-4 shadow-xl text-lg">
                  <span>Explore Shop</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/scent-finder" className="px-10 py-4 rounded-full border border-ink/10 font-medium hover:bg-white transition-all flex items-center justify-center bg-white/50 backdrop-blur-sm">
                  Find Your Match
                </Link>
              </div>
            </motion.div>

            {/* Right: Floating 3D Component */}
            <div className="relative group perspective-1000 hidden lg:block">
              <motion.div
                style={{ y: y2, rotate }}
                className="relative z-10"
              >
                <div className="relative">
                  {/* Glowing Aura behind bottle */}
                  <div className="absolute inset-10 bg-secondary/30 rounded-full blur-[80px] opacity-40 group-hover:opacity-80 transition-opacity duration-1000"></div>
                  
                  <img
                    src="https://images.unsplash.com/photo-1541605028969-f0b3fadef3dc?auto=format&fit=crop&q=80&w=1200"
                    alt="Hero Perfume Bottle"
                    className="w-full max-w-[500px] mx-auto drop-shadow-[0_50px_50px_rgba(0,0,0,0.15)] filter saturate-[0.8] hover:saturate-100 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Floating Labels */}
                  <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] -right-10 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Wind className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-[8px] uppercase font-bold text-ink/40 tracking-widest">Top Note</p>
                        <p className="text-xs font-bold">Midnight Lavender</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[20%] -left-10 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-[8px] uppercase font-bold text-ink/40 tracking-widest">Base Note</p>
                        <p className="text-xs font-bold">Smoked Vanilla</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-4">Our Masterpieces</h2>
            <p className="text-ink/60 max-w-md">Our most loved and iconic fragrances, carefully selected for excellence.</p>
          </div>
          <Link to="/shop" className="group flex items-center space-x-2 text-sm font-bold tracking-widest uppercase hover:text-secondary transition-colors">
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-primary/30 py-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Sparkles className="w-12 h-12 text-secondary mx-auto mb-6 opacity-50" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Special Summer Offer</h2>
            <p className="text-xl text-ink/70 mb-10">Get <span className="font-bold text-ink">20% OFF</span> on your first order. Use code <span className="bg-white px-3 py-1 rounded-sm font-mono font-bold">ESSENTIA20</span> at checkout.</p>
            <Link to="/shop" className="bg-ink text-white px-10 py-4 rounded-full font-bold hover:bg-ink/80 transition-all inline-block shadow-lg">
              Shop The Collection
            </Link>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
      </section>

      {/* Featured Statistics/Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center py-12">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <Leaf className="w-8 h-8 text-green-500/60" />
          </div>
          <h3 className="font-serif font-bold text-xl">100% Vegan</h3>
          <p className="text-ink/60 text-sm">Cruelty-free and ethically sourced ingredients in every bottle.</p>
        </div>
        <div className="space-y-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <ShieldCheck className="w-8 h-8 text-secondary/60" />
          </div>
          <h3 className="font-serif font-bold text-xl">Global Shipping</h3>
          <p className="text-ink/60 text-sm">We deliver our exquisite scents to over 50 countries worldwide.</p>
        </div>
        <div className="space-y-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <Sparkles className="w-8 h-8 text-accent/60" />
          </div>
          <h3 className="font-serif font-bold text-xl">Luxury Design</h3>
          <p className="text-ink/60 text-sm">Elegant packaging that reflects the quality of our scents.</p>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-4">New Arrivals</h2>
            <p className="text-ink/60 max-w-sm">Discover our latest creations and stay ahead of the scent trends.</p>
          </div>
          <div className="flex space-x-4">
            <div className="h-1 bg-ink/5 flex-1 w-32 hidden md:block self-center mr-4"></div>
            <Link to="/shop" className="text-sm font-bold tracking-widest uppercase hover:text-secondary">View All New Arrivals</Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Scent Discovery & Lab Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-primary/20 rounded-[40px] p-12 relative overflow-hidden group">
            <div className="relative z-10">
              <Sparkles className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-3xl font-serif font-bold mb-4">Scent Finder Quiz</h3>
              <p className="text-ink/60 mb-8 max-w-sm">Not sure what to wear? Answer 3 quick questions about your schedule and vibe, and we'll find your perfect match.</p>
              <Link to="/scent-finder" className="inline-flex items-center space-x-2 font-bold tracking-widest uppercase text-sm hover:text-secondary group">
                <span>Start Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          </div>

          <div className="bg-ink/5 rounded-[40px] p-12 relative overflow-hidden group">
            <div className="relative z-10">
              <Beaker className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-3xl font-serif font-bold mb-4">Custom Blend Workshop</h3>
              <p className="text-ink/60 mb-8 max-w-sm">Step into our digital lab. Select your favorite Top, Heart, and Base notes to create a bespoke artisanal perfume.</p>
              <Link to="/custom-blend" className="inline-flex items-center space-x-2 font-bold tracking-widest uppercase text-sm hover:text-secondary group">
                <span>Enter the Lab</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
