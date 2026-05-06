/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, Leaf, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 space-y-32">
      {/* Brand Story */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-secondary font-black tracking-[0.3em] uppercase text-xs mb-6 inline-block">The Essentia Philosophy</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-ink leading-tight mb-10">Crafting Scents That Tell <span className="text-secondary italic">Your</span> Story.</h1>
          <p className="text-xl text-ink/60 leading-relaxed font-light mb-8">
            Founded in 2026, Essentia Belle was born from a simple belief: that a scent is more than just a fragrance—it's a gateway to memories, an expression of personality, and a signature that remains long after you've left the room.
          </p>
          <p className="text-ink/60 leading-relaxed">
            Our atelier brings together legendary noses from Grasse and modern designers to create a collection that balances classical sophistication with contemporary spirit. Every bottle is a labor of love, crafted with the finest raw ingredients sourced ethically from across the globe.
          </p>
        </motion.div>
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="relative"
        >
          <img
            src="https://picsum.photos/seed/about/800/1000"
            alt="Perfume Workshop"
            className="rounded-[60px] shadow-2xl relative z-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary rounded-full -z-10 blur-2xl opacity-50"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-secondary rounded-full -z-10 blur-3xl opacity-30"></div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="text-center max-w-4xl mx-auto space-y-12">
        <h2 className="text-4xl font-serif font-bold">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div className="space-y-4 p-8 bg-white rounded-[40px] shadow-xs hover:shadow-xl transition-all border border-ink/5">
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-serif font-bold text-xl">Pure Artistry</h3>
            <p className="text-sm text-ink/60">Bespoke compositions created with surgical precision by master perfumers.</p>
          </div>
          <div className="space-y-4 p-8 bg-white rounded-[40px] shadow-xs hover:shadow-xl transition-all border border-ink/5">
             <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-serif font-bold text-xl">Sustainably Made</h3>
            <p className="text-sm text-ink/60">Eco-conscious packaging and 100% natural, ethically harvested botanicals.</p>
          </div>
          <div className="space-y-4 p-8 bg-white rounded-[40px] shadow-xs hover:shadow-xl transition-all border border-ink/5">
             <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-serif font-bold text-xl">Personal Connection</h3>
            <p className="text-sm text-ink/60">A commitment to helping you find the scent that elevates your presence.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
