/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useProducts } from '../ProductContext';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
};

export default function Chatbot() {
  const { products } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: "Hello! I'm Essentia, your personal fragrance consultant. How can I help you find your perfect scent today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('essentia-open-chat', handleOpenChat);
    return () => window.removeEventListener('essentia-open-chat', handleOpenChat);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'undefined') {
        throw new Error('MISSING_KEY');
      }

      const productContext = products.map(p => 
        `NAME: ${p.name}\nBRAND: ${p.brand}\nPRICE: Rs. ${p.price.toLocaleString()}\nCATEGORY: ${p.category}\nNOTES: Top (${p.notes.top.join(', ')}), Heart (${p.notes.middle.join(', ')}), Base (${p.notes.base.join(', ')})\nDESCRIPTION: ${p.description}\n---`
      ).join('\n');
      
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        systemInstruction: `You are Essentia, the premier AI fragrance consultant for 'Essentia Belle' boutique. Your goal is to guide customers to their perfect luxury scent with sophistication and deep perfume knowledge.

STRICT RESPONSE RULES:
1. BREVITY: Keep answers extremely short and to the point. Avoid long paragraphs.
2. FORMATTING: Use "point-to-point" style. Use bullet points for any list or recommendation.
3. PERSONALIZATION: When a user mentions a mood or occasion, provide a direct recommendation from our collection with a quick 1-sentence reason.

CRITICAL CONSTRAINTS:
1. CURRENCY: Always use Pakistani Rupees (Rs.) when mentioning prices.
2. COLLECTION KNOWLEDGE: Use ONLY the following list of perfumes. If a user asks for something we don't have, politely steer them to our closest matches.
3. TONE: Elegant, helpful, and professional but concise.
4. STORE INFO: You represent "Essentia Belle Boutique".

OUR CURRENT COLLECTION:
${productContext}

When recommending a product, ALWAYS mention its full name and price in Rs.`
      });

      const result = await model.generateContent({
        contents: [
          { role: 'user', parts: [{ text: input }] }
        ],
        generationConfig: {
          maxOutputTokens: 500,
        }
      });

      const responseText = result.response.text();

      const modelMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: responseText || "I'm sorry, I'm having trouble connecting right now. Please try again later." 
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error: any) {
      console.error("Chatbot Error:", error);
      let errorText = "I'm sorry, I encountered an error. Please check your connection.";
      
      const errorMessage = (error.message || "").toString();
      const stringifiedError = JSON.stringify(error).toLowerCase();
      
      if (errorMessage === 'MISSING_KEY') {
        errorText = "My 'AI Brain' is disconnected! To chat with me on your local computer, please add a GEMINI_API_KEY to your .env file.";
      } else if (errorMessage.includes('API_KEY_INVALID') || stringifiedError.includes('api_key_invalid')) {
        errorText = "Your Gemini API Key seems to be invalid. Please double-check it in your .env file.";
      } else if (errorMessage.includes('403') || errorMessage.includes('permission denied') || stringifiedError.includes('403')) {
        errorText = "Access Denied. Your API key might not have permission for this model, or you are in a restricted region.";
      } else if (errorMessage.includes('429') || stringifiedError.includes('429') || stringifiedError.includes('quota')) {
        errorText = "My 'AI Brain' is resting! (Quota Exceeded). You've sent too many messages quickly or hit your daily limit. Please wait 1-2 minutes and try again.";
      } else if (errorMessage) {
        errorText = `Error details: ${errorMessage.slice(0, 100)}`;
      }
      
      setMessages(prev => [...prev, { id: 'error', role: 'model', text: errorText }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-[400px] max-w-[90vw] bg-white rounded-[32px] shadow-2xl border border-ink/5 overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-primary/20 p-6 flex justify-between items-center border-b border-ink/5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Sparkles className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-ink">Essentia Assistant</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] text-ink/40 font-bold uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/50 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 text-ink/40" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#fdfbf7]/50"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-secondary text-white' : 'bg-primary/30 text-ink'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-secondary text-white rounded-tr-none' : 'bg-white shadow-sm border border-black/5 rounded-tl-none text-ink/80'}`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-black/5">
                    <Loader2 className="w-4 h-4 animate-spin text-secondary" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-ink/5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask about our collection..."
                  className="w-full pl-6 pr-12 py-4 bg-bg-soft rounded-full text-sm focus:outline-hidden border border-transparent focus:border-secondary transition-all"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-2 p-2 bg-secondary text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:grayscale"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-white shadow-2xl rounded-full flex items-center justify-center text-secondary border border-secondary/20 hover:border-secondary transition-all group relative"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white"></span>
      </motion.button>
    </div>
  );
}
