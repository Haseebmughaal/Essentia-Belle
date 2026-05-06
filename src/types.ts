/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  category: 'Men' | 'Women' | 'Unisex';
  description: string;
  image: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
