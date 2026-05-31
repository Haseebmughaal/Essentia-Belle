/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from './types';
import { products as starterProducts } from './data';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  resetToStarter: () => Promise<void>;
  saveAsDefault: () => Promise<void>;
  clearAll: () => Promise<void>;
  isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (e) {
      console.error("Failed to fetch products from API, falling back to empty list", e);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const seedStarters = async () => {
    setProducts([]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product: Product) => {
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      await fetchProducts();
    } catch (e) {
      console.error("Add failed", e);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      await fetchProducts();
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      });
      await fetchProducts();
    } catch (e) {
      console.error("Update failed", e);
    }
  };

  const resetToStarter = async () => {
    try {
      const response = await fetch('/api/admin/restore-snapshot', { method: 'POST' });
      if (response.ok) {
        await fetchProducts();
        return;
      }
    } catch (e) {
      console.error("Custom restore failed, falling back to basic starters", e);
    }
    // Fallback to basic starter if no snapshot exists
    await clearAll();
    await seedStarters();
  };

  const saveAsDefault = async () => {
    try {
      const response = await fetch('/api/admin/snapshot', { method: 'POST' });
      if (response.ok) {
        alert("Success! Your current inventory is now the permanent 'Restore Point'.");
      }
    } catch (e) {
      console.error("Snapshot failed", e);
      alert("Failed to save snapshot.");
    }
  };

  const clearAll = async () => {
    try {
      await fetch('/api/products', { method: 'DELETE' });
      setProducts([]);
    } catch (e) {
      console.error("Clear failed", e);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct, resetToStarter, saveAsDefault, clearAll, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
