/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sun, Moon, Briefcase, PartyPopper, Heart, Zap, ArrowRight, RefreshCw } from 'lucide-react';
import { useProducts } from '../ProductContext';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

type Question = {
  id: string;
  text: string;
  options: {
    label: string;
    value: string;
    icon: any;
  }[];
};

const questions: Question[] = [
  {
    id: 'time',
    text: 'When do you plan to wear your scent?',
    options: [
      { label: 'Daytime', value: 'day', icon: Sun },
      { label: 'Nighttime', value: 'night', icon: Moon }
    ]
  },
  {
    id: 'occasion',
    text: 'For what occasion?',
    options: [
      { label: 'Office & Work', value: 'office', icon: Briefcase },
      { label: 'Parties & Events', value: 'party', icon: PartyPopper },
      { label: 'Casual / Everyday', value: 'casual', icon: Zap },
      { label: 'Date Night', value: 'date', icon: Heart }
    ]
  },
  {
    id: 'vibe',
    text: 'What is your preferred vibe?',
    options: [
      { label: 'Fresh & Clean', value: 'fresh', icon: Zap },
      { label: 'Sweet & Warm', value: 'sweet', icon: Sun },
      { label: 'Dark & Mysterious', value: 'dark', icon: Moon },
      { label: 'Floral & Romantic', value: 'floral', icon: Heart }
    ]
  }
];

export default function ScentFinder() {
  const { products } = useProducts();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendation, setRecommendation] = useState<Product | null>(null);

  const handleAnswer = (value: string) => {
    const nextAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(nextAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      findRecommendation(nextAnswers);
    }
  };

  const findRecommendation = (finalAnswers: Record<string, string>) => {
    if (products.length === 0) {
      setRecommendation(null);
      setStep(questions.length);
      return;
    }

    // Dynamic matching logic: search for keywords in descriptions and notes
    let picked: Product = products[0];

    const searchStr = `${finalAnswers.time} ${finalAnswers.occasion} ${finalAnswers.vibe}`.toLowerCase();
    
    const scores = products.map(p => {
      let score = 0;
      const pText = `${p.name} ${p.description} ${p.notes.top.join(' ')} ${p.notes.middle.join(' ')} ${p.notes.base.join(' ')}`.toLowerCase();
      
      if (pText.includes(finalAnswers.time)) score += 1;
      if (pText.includes(finalAnswers.occasion)) score += 2;
      if (pText.includes(finalAnswers.vibe)) score += 3;
      
      return { product: p, score };
    });

    scores.sort((a, b) => b.score - a.score);
    picked = scores[0].product;

    setRecommendation(picked);
    setStep(questions.length);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setRecommendation(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <Sparkles className="w-12 h-12 text-secondary mx-auto mb-6" />
        <h1 className="text-5xl font-serif font-bold mb-4">Scent Finder</h1>
        <p className="text-ink/60">Answer a few questions and we'll find your perfect match.</p>
      </div>

      <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-2xl border border-ink/5 min-h-[500px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {step < questions.length ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="flex justify-center space-x-2">
                {questions.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 w-12 rounded-full transition-all duration-500 ${i <= step ? 'bg-secondary' : 'bg-ink/5'}`}
                  />
                ))}
              </div>
              
              <h2 className="text-3xl font-serif font-bold text-center">{questions[step].text}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {questions[step].options.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className="group flex items-center p-6 rounded-2xl border-2 border-ink/5 hover:border-secondary hover:bg-primary/10 transition-all text-left"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-secondary" />
                      </div>
                      <span className="text-lg font-medium">{option.label}</span>
                      <ArrowRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-secondary" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-10"
            >
              <div>
                <h2 className="text-4xl font-serif font-bold mb-4">Your Signature Scent</h2>
                <p className="text-ink/60">Based on your lifestyle and preferences, we recommend:</p>
              </div>

              {recommendation && (
                <div className="max-w-sm mx-auto">
                  <ProductCard product={recommendation} />
                </div>
              )}

              <button
                onClick={reset}
                className="flex items-center space-x-2 mx-auto text-ink/40 hover:text-secondary transition-colors font-bold tracking-widest text-sm uppercase"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Start Over</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
