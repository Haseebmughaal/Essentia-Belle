/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Info */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="space-y-12"
        >
          <div>
            <span className="text-secondary font-black tracking-[0.3em] uppercase text-xs mb-6 inline-block">Get In Touch</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-ink leading-tight mb-8">We'd Love to Hear <span className="text-secondary italic">From You</span>.</h1>
            <p className="text-lg text-ink/60 font-light leading-relaxed">
              Have a question about our collections or need help choosing a scent? Our fragrance experts are here to assist you with personalized recommendations.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-xs flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-1">Email Us</p>
                <p className="text-xl font-serif font-bold">concierge@aurafragrance.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-xs flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-1">Call Us</p>
                <p className="text-xl font-serif font-bold">+1 (888) AURA-LUX</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-xs flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary-dark" />
              </div>
              <div>
                <p className="text-xs font-bold text-ink/40 uppercase tracking-widest mb-1">Visit Our Atelier</p>
                <p className="text-xl font-serif font-bold uppercase">75 Fifth Avenue, New York, NY</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="bg-white p-10 lg:p-16 rounded-[60px] shadow-2xl border border-ink/5"
        >
          <form className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink/40 uppercase tracking-widest ml-1">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-bg-soft border border-transparent focus:border-primary rounded-2xl px-6 py-4 focus:outline-hidden transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-ink/40 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-bg-soft border border-transparent focus:border-primary rounded-2xl px-6 py-4 focus:outline-hidden transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-ink/40 uppercase tracking-widest ml-1">Inquiry Type</label>
              <select className="w-full bg-bg-soft border border-transparent focus:border-primary rounded-2xl px-6 py-4 focus:outline-hidden transition-all appearance-none">
                <option>General Support</option>
                <option>Fragrance Consultation</option>
                <option>Order Inquiries</option>
                <option>Partnerships</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-ink/40 uppercase tracking-widest ml-1">Your Message</label>
              <textarea
                rows={5}
                placeholder="How can we help you find your signature scent?"
                className="w-full bg-bg-soft border border-transparent focus:border-primary rounded-3xl px-6 py-4 focus:outline-hidden transition-all resize-none"
              ></textarea>
            </div>
            <button
               type="submit"
               className="btn-pastel w-full py-5 text-lg flex items-center justify-center space-x-3 shadow-lg"
               onClick={(e) => e.preventDefault()}
            >
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
