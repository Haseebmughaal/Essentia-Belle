/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, RefreshCw, Save, Image as ImageIcon, Tag, Star, Package, Type, Info, Layers, Lock, LogOut, Key, Edit, Upload, X } from 'lucide-react';
import { useProducts } from '../ProductContext';
import { Product } from '../types';

export default function Admin() {
  const { products, addProduct, deleteProduct, updateProduct, clearAll, resetToStarter } = useProducts();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('essentia_admin_session') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'aura_admin_access';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      sessionStorage.setItem('essentia_admin_session', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 2000);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('essentia_admin_session');
  };

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    brand: 'Essentia',
    price: 0,
    rating: 5,
    category: 'Unisex',
    description: '',
    image: '',
    notes: {
      top: [],
      middle: [],
      base: []
    }
  });

  const [topNotes, setTopNotes] = useState('');
  const [middleNotes, setMiddleNotes] = useState('');
  const [baseNotes, setBaseNotes] = useState('');

  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
  const [confirmRestore, setConfirmRestore] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleClearAll = () => {
    clearAll();
    setConfirmDeleteAll(false);
  };

  const handleEdit = (product: Product) => {
    setNewProduct(product);
    setTopNotes(product.notes.top.join(', '));
    setMiddleNotes(product.notes.middle.join(', '));
    setBaseNotes(product.notes.base.join(', '));
    setEditingId(product.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setIsAdding(false);
    setEditingId(null);
    setNewProduct({
      name: '',
      brand: 'Essentia',
      price: 0,
      rating: 5,
      category: 'Unisex',
      description: '',
      image: '',
      notes: { top: [], middle: [], base: [] }
    });
    setTopNotes('');
    setMiddleNotes('');
    setBaseNotes('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Product = {
      ...newProduct as Product,
      id: editingId || Date.now().toString(),
      notes: {
        top: topNotes.split(',').map(s => s.trim()).filter(Boolean),
        middle: middleNotes.split(',').map(s => s.trim()).filter(Boolean),
        base: baseNotes.split(',').map(s => s.trim()).filter(Boolean),
      }
    };
    
    if (editingId) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }

    cancelEdit();
  };

  const handleRestore = () => {
    resetToStarter();
    setConfirmRestore(false);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeletingId(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white rounded-[40px] p-12 shadow-2xl border border-ink/5 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock className="w-10 h-10 text-secondary" />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-2">Essentia Admin</h1>
          <p className="text-ink/40 text-sm mb-10">Access is restricted to store management only.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className={`relative transition-all ${authError ? 'shake' : ''}`}>
               <Key className="absolute left-4 top-4 w-5 h-5 text-ink/20" />
               <input 
                 type="password"
                 required
                 placeholder="Access Password"
                 className={`w-full pl-12 pr-6 py-4 bg-bg-soft rounded-2xl focus:outline-hidden border-2 transition-all ${authError ? 'border-red-400 bg-red-50' : 'border-transparent focus:border-secondary'}`}
                 value={passwordInput}
                 onChange={(e) => setPasswordInput(e.target.value)}
               />
               {authError && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2">Invalid Credentials</p>}
            </div>
            <button
               type="submit"
               className="btn-pastel w-full py-5 text-lg shadow-xl"
            >
              Sign In to Dashboard
            </button>
          </form>
          <div className="mt-8 text-[10px] font-bold text-ink/20 uppercase tracking-[0.2em]">
            Essentia Belle Boutique © 2026
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-4 md:space-y-0">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-4xl font-serif font-bold text-ink">Admin Portal</h1>
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 text-ink/20 hover:text-red-500 rounded-full transition-all group"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
          <p className="text-ink/60">Manage your fragrance collection and boutique inventory.</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="btn-pastel flex items-center space-x-2 px-6 py-3 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Scent</span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setConfirmDeleteAll(!confirmDeleteAll)}
              className={`px-6 py-3 rounded-full border transition-all text-sm font-bold uppercase tracking-widest ${confirmDeleteAll ? 'bg-red-500 text-white border-red-500' : 'border-red-200 text-red-500 hover:bg-red-50'}`}
            >
              {confirmDeleteAll ? 'Click again to confirm' : 'Clear All'}
            </button>
            {confirmDeleteAll && (
              <button 
                onClick={handleClearAll}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setConfirmRestore(!confirmRestore)}
              className={`px-6 py-3 rounded-full border transition-all text-sm font-bold uppercase tracking-widest flex items-center space-x-2 ${confirmRestore ? 'bg-secondary text-white border-secondary' : 'border-secondary/20 text-secondary hover:bg-secondary/5'}`}
            >
              <RefreshCw className={`w-4 h-4 ${confirmRestore ? 'animate-spin' : ''}`} />
              <span>{confirmRestore ? 'Confirm Restore?' : 'Restore Defaults'}</span>
            </button>
            {confirmRestore && (
              <button 
                onClick={handleRestore}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>

      {isAdding && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] p-8 shadow-xl border border-ink/5 mb-12"
        >
          <div className="flex items-center space-x-3 mb-8">
            <h2 className="text-2xl font-serif font-bold">New Fragrance Details</h2>
            <div className="h-px flex-1 bg-ink/5"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Image Upload Section */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-ink/40 mb-4">
                  <Upload className="w-4 h-4" />
                  <span>Product Imagery</span>
                </label>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full md:w-64 aspect-square rounded-3xl bg-bg-soft border-2 border-dashed border-ink/10 flex flex-col items-center justify-center cursor-pointer hover:border-secondary hover:bg-white transition-all group relative overflow-hidden"
                  >
                    {newProduct.image ? (
                      <>
                        <img src={newProduct.image} className="w-full h-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <p className="text-white text-[10px] font-bold uppercase tracking-widest">Change Image</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-ink/20 group-hover:text-secondary mb-2 transition-colors" />
                        <p className="text-[10px] font-bold text-ink/40 uppercase tracking-widest group-hover:text-secondary">Upload from Local</p>
                      </>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                  <div className="flex-1 w-full space-y-4">
                    <p className="text-xs text-ink/40">Or provide a web-hosted URL:</p>
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-4 w-5 h-5 text-ink/20" />
                      <input 
                        type="url" 
                        value={newProduct.image} 
                        onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-bg-soft border-transparent focus:bg-white focus:border-secondary transition-all outline-hidden text-sm"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    {newProduct.image && (
                      <button 
                        type="button" 
                        onClick={() => setNewProduct({...newProduct, image: ''})}
                        className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center space-x-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove Image</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <label className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-ink/40">
                  <Type className="w-4 h-4" />
                  <span>Perfume Name</span>
                </label>
                <input 
                  required
                  type="text" 
                  value={newProduct.name} 
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-5 py-3 rounded-2xl bg-bg-soft border-transparent focus:bg-white focus:border-secondary transition-all outline-hidden"
                  placeholder="e.g. Midnight Lavender"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-ink/40">
                  <Tag className="w-4 h-4" />
                  <span>Brand</span>
                </label>
                <input 
                  type="text" 
                  value={newProduct.brand} 
                  onChange={e => setNewProduct({...newProduct, brand: e.target.value})}
                  className="w-full px-5 py-3 rounded-2xl bg-bg-soft border-transparent focus:bg-white focus:border-secondary transition-all outline-hidden"
                  placeholder="Essentia Belle"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-ink/40">
                  <Package className="w-4 h-4" />
                  <span>Price (Rs.)</span>
                </label>
                <input 
                  required
                  type="number" 
                  value={isNaN(newProduct.price as number) ? '' : newProduct.price} 
                  onChange={e => {
                    const val = parseFloat(e.target.value);
                    setNewProduct({...newProduct, price: isNaN(val) ? undefined : val});
                  }}
                  className="w-full px-5 py-3 rounded-2xl bg-bg-soft border-transparent focus:bg-white focus:border-secondary transition-all outline-hidden"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-ink/40">
                  <Layers className="w-4 h-4" />
                  <span>Category</span>
                </label>
                <select 
                  value={newProduct.category} 
                  onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}
                  className="w-full px-5 py-3 rounded-2xl bg-bg-soft border-transparent focus:bg-white focus:border-secondary transition-all outline-hidden appearance-none"
                >
                  <option value="Unisex">Unisex</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-ink/40">
                  <Star className="w-4 h-4" />
                  <span>Initial Rating</span>
                </label>
                <input 
                  type="number" 
                  step="0.1" 
                  max="5" 
                  min="0"
                  value={isNaN(newProduct.rating as number) ? '' : newProduct.rating} 
                  onChange={e => {
                    const val = parseFloat(e.target.value);
                    setNewProduct({...newProduct, rating: isNaN(val) ? undefined : val});
                  }}
                  className="w-full px-5 py-3 rounded-2xl bg-bg-soft border-transparent focus:bg-white focus:border-secondary transition-all outline-hidden"
                />
              </div>

              <div className="space-y-4">
                {/* Image URL removed from here as it's now in the upload section above */}
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-ink/40">
                <Info className="w-4 h-4" />
                <span>Description</span>
              </label>
              <textarea 
                required
                rows={3}
                value={newProduct.description} 
                onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                className="w-full px-5 py-4 rounded-[24px] bg-bg-soft border-transparent focus:bg-white focus:border-secondary transition-all outline-hidden resize-none"
                placeholder="Describe the mood and artistry of the scent..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-ink/40">Top Notes (Comma separated)</label>
                <input 
                  type="text" 
                  value={topNotes} 
                  onChange={e => setTopNotes(e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl bg-bg-soft border-transparent focus:bg-white focus:border-secondary transition-all outline-hidden"
                  placeholder="Lavender, Bergamot..."
                />
              </div>
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-ink/40">Heart Notes (Comma separated)</label>
                <input 
                  type="text" 
                  value={middleNotes} 
                  onChange={e => setMiddleNotes(e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl bg-bg-soft border-transparent focus:bg-white focus:border-secondary transition-all outline-hidden"
                  placeholder="Jasmine, Rose..."
                />
              </div>
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-ink/40">Base Notes (Comma separated)</label>
                <input 
                  type="text" 
                  value={baseNotes} 
                  onChange={e => setBaseNotes(e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl bg-bg-soft border-transparent focus:bg-white focus:border-secondary transition-all outline-hidden"
                  placeholder="Amber, Sandalwood..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button 
                type="button" 
                onClick={cancelEdit}
                className="px-8 py-4 rounded-full font-bold text-ink/40 hover:text-ink transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-pastel px-12 py-4 shadow-xl flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>{editingId ? 'Update Fragrance' : 'Save Fragrance'}</span>
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Product List */}
      <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-ink/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-soft/50 border-b border-ink/5">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-ink/40">Product</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-ink/40">Brand</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-ink/40">Category</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-ink/40">Price (Rs.)</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-ink/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-ink/40 italic">
                    No fragrances in the vault. Add your first scent above.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="border-b border-ink/5 hover:bg-bg-soft/20 transition-colors">
                    <td className="px-8 py-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="w-12 h-16 object-cover rounded-lg shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-serif font-bold text-lg">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-ink/60">{p.brand}</td>
                    <td className="px-8 py-4">
                      <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-8 py-4 font-bold">Rs. {p.price.toLocaleString()}</td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {deletingId === p.id ? (
                          <div className="flex items-center space-x-2 animate-in slide-in-from-right-4">
                            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Are you sure?</span>
                            <button 
                              onClick={() => handleDelete(p.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded-full text-[10px] font-bold hover:bg-red-600 transition-colors"
                            >
                              YES
                            </button>
                            <button 
                              onClick={() => setDeletingId(null)}
                              className="px-3 py-1 bg-ink/5 text-ink/40 rounded-full text-[10px] font-bold hover:bg-ink/10 transition-colors"
                            >
                              NO
                            </button>
                          </div>
                        ) : (
                          <>
                            <button 
                              onClick={() => handleEdit(p)}
                              className="p-3 text-secondary hover:bg-secondary/10 rounded-full transition-all"
                              title="Edit fragrance"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => setDeletingId(p.id)}
                              className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                              title="Delete fragrance"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
