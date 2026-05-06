/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Beaker, Droplets, Leaf, Flower2, Wind, Search, Check, ShoppingBag, Plus, X } from 'lucide-react';
import { useCart } from '../CartContext';

type Note = {
  id: string;
  name: string;
  icon: any;
  type: 'Top' | 'Heart' | 'Base';
  description: string;
  color: string;
};

const availableNotes: Note[] = [
  { id: '1', name: 'Bergamot', icon: Droplets, type: 'Top', description: 'Fresh, citrusy, and slightly spicy.', color: 'bg-yellow-100' },
  { id: '2', name: 'Lavender', icon: Flower2, type: 'Top', description: 'Calm, floral, and herbaceous.', color: 'bg-purple-100' },
  { id: '3', name: 'Sea Salt', icon: Wind, type: 'Top', description: 'Crisp, aquatic, and breezy.', color: 'bg-blue-100' },
  { id: '4', name: 'Pink Pepper', icon: Wind, type: 'Top', description: 'Spicy, bright, and energetic.', color: 'bg-red-100' },
  
  { id: '5', name: 'Jasmine', icon: Flower2, type: 'Heart', description: 'Intense white floral and sensual.', color: 'bg-pink-50' },
  { id: '6', name: 'Damask Rose', icon: Flower2, type: 'Heart', description: 'Classic, romantic, and deep floral.', color: 'bg-rose-100' },
  { id: '7', name: 'Neroli', icon: Leaf, type: 'Heart', description: 'Sweet, honeyed, and citrusy floral.', color: 'bg-orange-50' },
  { id: '8', name: 'Ginger', icon: Droplets, type: 'Heart', description: 'Sharp, spicy, and warming.', color: 'bg-amber-100' },

  { id: '9', name: 'Sandalwood', icon: Wind, type: 'Base', description: 'Creamy, woody, and luxurious.', color: 'bg-stone-200' },
  { id: '10', name: 'Vanilla Bean', icon: Droplets, type: 'Base', description: 'Sweet, cozy, and comforting.', color: 'bg-yellow-50' },
  { id: '11', name: 'White Musk', icon: Wind, type: 'Base', description: 'Clean, powdery, and soft.', color: 'bg-slate-100' },
  { id: '12', name: 'Patchouli', icon: Leaf, type: 'Base', description: 'Earthy, dark, and mysterious.', color: 'bg-emerald-100' },
];

export default function CustomScent() {
  const { addToCart } = useCart();
  const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);
  const [isOrdered, setIsOrdered] = useState(false);

  const toggleNote = (note: Note) => {
    if (selectedNotes.find(n => n.id === note.id)) {
      setSelectedNotes(selectedNotes.filter(n => n.id !== note.id));
    } else {
      if (selectedNotes.length < 3) {
        setSelectedNotes([...selectedNotes, note]);
      }
    }
  };

  const handleCreate = () => {
    if (selectedNotes.length === 3) {
      // Create a virtual product
      const customProduct = {
        id: `custom-${Date.now()}`,
        name: `Custom Blend: ${selectedNotes.map(n => n.name).join(' & ')}`,
        brand: 'Essentia Lab',
        price: 35000,
        rating: 5.0,
        category: 'Bespoke',
        description: 'A unique hand-crafted blend designed by you in our Essentia Lab.',
        image: 'https://picsum.photos/seed/custom-bottle/600/800',
        notes: {
          top: [selectedNotes.find(n => n.type === 'Top')?.name || 'Clean'],
          middle: [selectedNotes.find(n => n.type === 'Heart')?.name || 'Floral'],
          base: [selectedNotes.find(n => n.type === 'Base')?.name || 'Woody']
        }
      };
      // @ts-ignore
      addToCart(customProduct);
      setIsOrdered(true);
      setTimeout(() => setIsOrdered(false), 2000);
      setSelectedNotes([]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left: Lab Interface */}
        <div className="space-y-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-secondary font-bold tracking-widest uppercase text-xs mb-4">
              <Beaker className="w-4 h-4" />
              <span>Essentia Belle Lab</span>
            </div>
            <h1 className="text-5xl font-serif font-bold mb-6 italic leading-tight">Design Your <br /> Signature Blend</h1>
            <p className="text-ink/60 text-lg">Select exactly 3 notes from our library to create a bespoke perfume that is uniquely yours.</p>
          </div>

          <div className="space-y-8">
            {['Top', 'Heart', 'Base'].map((sectionType) => (
              <div key={sectionType} className="space-y-4">
                <h3 className="text-sm font-bold tracking-widest uppercase text-ink/40">{sectionType} Notes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availableNotes.filter(n => n.type === sectionType).map((note) => {
                    const isSelected = selectedNotes.find(sn => sn.id === note.id);
                    const disabled = !isSelected && selectedNotes.length >= 3;
                    const Icon = note.icon;

                    return (
                      <button
                        key={note.id}
                        disabled={disabled}
                        onClick={() => toggleNote(note)}
                        className={`p-4 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-center space-y-2
                          ${isSelected ? 'border-secondary bg-primary/20' : 'border-ink/5 bg-white'}
                          ${disabled ? 'opacity-30 grayscale cursor-not-allowed' : 'hover:border-primary'}
                        `}
                      >
                        <div className={`w-10 h-10 rounded-xl ${note.color} flex items-center justify-center text-ink/60`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider">{note.name}</span>
                        {isSelected && <Check className="w-3 h-3 text-secondary absolute top-2 right-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: The Bottle / Preview */}
        <div className="lg:sticky lg:top-32">
          <div className="bg-white rounded-[60px] p-12 shadow-2xl border border-ink/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 space-y-10 text-center">
              <div className="relative w-48 h-64 mx-auto perspective-1000">
                <motion.div 
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 10 }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                  className="w-full h-full bg-linear-to-b from-white/40 to-white/10 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg flex flex-col items-center justify-center"
                >
                  <div className="w-12 h-4 bg-ink/80 rounded-t-sm mb-1"></div>
                  <div className="w-16 h-2 bg-ink/40 rounded-sm mb-8"></div>
                  
                  <div className="space-y-2 text-center px-4">
                    <p className="font-serif italic text-xs opacity-40">L'Artiste de</p>
                    <h4 className="font-serif font-bold text-sm tracking-tighter uppercase leading-none">Essentia Bespoke</h4>
                    <div className="w-8 h-px bg-ink/10 mx-auto my-4"></div>
                    <div className="flex flex-wrap justify-center gap-1">
                      {selectedNotes.map(n => (
                        <span key={n.id} className="text-[7px] uppercase font-bold tracking-widest text-ink/40">{n.name}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating Note Visualizers */}
                <AnimatePresence>
                  {selectedNotes.map((note, index) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className={`absolute w-8 h-8 rounded-full ${note.color} blur-md opacity-60 z-0`}
                      style={{ 
                        top: `${20 + index * 25}%`,
                        left: index === 0 ? '0%' : index === 1 ? '70%' : '35%'
                      }}
                    />
                  ))}
                </AnimatePresence>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-bold">Your Custom Recipe</h3>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3].map((num) => (
                    <div 
                      key={num}
                      className={`w-12 h-12 rounded-2xl border-2 border-dashed flex items-center justify-center transition-all
                        ${selectedNotes[num-1] ? 'border-secondary bg-primary/10 border-solid' : 'border-ink/10'}
                      `}
                    >
                      {selectedNotes[num-1] ? (
                        <Check className="w-5 h-5 text-secondary" />
                      ) : (
                        <Plus className="w-4 h-4 text-ink/10" />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-ink/40 min-h-[3rem]">
                  {selectedNotes.length < 3 
                    ? `Please select ${3 - selectedNotes.length} more note${3 - selectedNotes.length > 1 ? 's' : ''} to complete your blend.`
                    : "Your formula is perfectly balanced. Ready to be bottled."}
                </p>
              </div>

              <button
                disabled={selectedNotes.length < 3 || isOrdered}
                onClick={handleCreate}
                className={`w-full py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center space-x-3
                  ${selectedNotes.length === 3 
                    ? 'btn-pastel shadow-xl cursor-pointer' 
                    : 'bg-ink/5 text-ink/20 cursor-not-allowed'}
                `}
              >
                {isOrdered ? (
                  <>
                    <Check className="w-6 h-6" />
                    <span>Added to Lab Queue</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Bottle It Now — Rs. 35,000</span>
                  </>
                )}
              </button>

              <div className="pt-6 border-t border-ink/5 text-[10px] uppercase font-bold tracking-[0.2em] text-ink/30 space-y-2">
                <p>Limited Edition Lab Run</p>
                <p>Hand-poured in Artisanal Bottles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
