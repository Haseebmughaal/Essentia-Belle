/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Midnight Lavender',
    brand: 'Essentia Luxe',
    price: 24500,
    rating: 4.8,
    category: 'Unisex',
    description: 'A soothing and mysterious blend of fresh lavender and smoked vanilla, perfect for peaceful evenings and starry nights.',
    image: 'https://images.unsplash.com/photo-1541605028969-f0b3fadef3dc?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Lavender', 'Bergamot'],
      middle: ['Jasmine', 'Vanilla'],
      base: ['Sandalwood', 'Musk']
    },
    isFeatured: true
  },
  {
    id: '2',
    name: 'Rose Bloom',
    brand: 'Floral Essence',
    price: 18900,
    rating: 4.5,
    category: 'Women',
    description: 'A romantic bouquet of morning roses and pink peonies, encapsulated in a delicate crystal bottle for a radiant day.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Pink Pepper', 'Litchi'],
      middle: ['Damask Rose', 'Peony'],
      base: ['Cedarwood', 'Amber']
    },
    isNew: true,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Ocean Breeze',
    brand: 'Aqua Fresh',
    price: 15500,
    rating: 4.2,
    category: 'Men',
    description: 'A crisp, energetic fragrance inspired by the Mediterranean coast and salty sea spray. Ideal for office and outdoor activities.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Sea Notes', 'Lime'],
      middle: ['Rosemary', 'Sage'],
      base: ['Patchouli', 'Frankincense']
    },
    isNew: true
  },
  {
    id: '4',
    name: 'Golden Amber',
    brand: 'Orient Luxury',
    price: 32000,
    rating: 4.9,
    category: 'Unisex',
    description: 'Rich, opulent amber combined with exotic spices and a hint of oud wood. A powerful statement for parties and special events.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Saffron', 'Cinnamon'],
      middle: ['Amber', 'Labdanum'],
      base: ['Oud', 'Vanilla Bean']
    },
    isFeatured: true
  },
  {
    id: '5',
    name: 'Citrus Zest',
    brand: 'Solaris',
    price: 12400,
    rating: 4.3,
    category: 'Men',
    description: 'An uplifting explosion of Italian citrus and fresh mint, cooling and vibrant for a sunny summer day.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Lemon', 'Grapefruit'],
      middle: ['Mint', 'Ginger'],
      base: ['Patchouli', 'White Musk']
    }
  },
  {
    id: '6',
    name: 'Velvet Jasmine',
    brand: 'Essentia Luxe',
    price: 21000,
    rating: 4.7,
    category: 'Women',
    description: 'Sensual white jasmine layered with sweet nectarine and creamy almond milk. Elegant and sophisticated for any occasion.',
    image: 'https://images.unsplash.com/photo-1583467875263-d50dec37a88c?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Nectarine'],
      middle: ['Jasmine', 'Almond'],
      base: ['Tonka Bean', 'Benzoin']
    }
  },
  {
    id: '7',
    name: 'Azure Musk',
    brand: 'Essentia Prive',
    price: 28000,
    rating: 4.9,
    category: 'Unisex',
    description: 'A pure, ethereal blend of high-altitude musk and chilled aquatic notes. Crisp as a morning breeze over a hidden glacial lake.',
    image: 'https://images.unsplash.com/photo-1512201066345-4bb690d5622a?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Aldehydes', 'Sea Mist'],
      middle: ['White Musk', 'Lotus'],
      base: ['Grey Amber', 'Cotton Wood']
    },
    isNew: true
  },
  {
    id: '8',
    name: 'Ruby Saffron',
    brand: 'Essentia Noir',
    price: 34500,
    rating: 5.0,
    category: 'Unisex',
    description: 'An intoxicating, red-hot gourmand masterpiece. Luxurious saffron meets burnt sugar and deep resins for a lingering evening trail.',
    image: 'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Red Saffron', 'Bitter Almond'],
      middle: ['Jasmine Egypt', 'Cedarwood'],
      base: ['Ambergris', 'Brown Sugar']
    },
    isFeatured: true
  },
  {
    id: '9',
    name: 'Emerald Vetiver',
    brand: 'Essentia Green',
    price: 13500,
    rating: 4.4,
    category: 'Men',
    description: 'Earthy, leafy, and revitalizing. A sharp burst of Haitian vetiver balanced with cut grass and green citrus.',
    image: 'https://images.unsplash.com/photo-1563170351-be61cf88c5ef?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Grapefruit', 'Sage'],
      middle: ['Geranium', 'Vetiver'],
      base: ['Oakmoss', 'Cedar']
    }
  },
  {
    id: '10',
    name: 'Silk Orchid',
    brand: 'Essentia Belle',
    price: 19500,
    rating: 4.6,
    category: 'Women',
    description: 'Delicate orchid petals dipped in creamy coconut milk and white sandalwood. The epitome of feminine grace.',
    image: 'https://images.unsplash.com/photo-1616948055599-968600539ecb?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Coconut', 'Peach Blossom'],
      middle: ['Wild Orchid', 'Ylang Ylang'],
      base: ['Sandalwood', 'Vanilla Silk']
    },
    isNew: true
  },
  {
    id: '11',
    name: 'Citrine Aura',
    brand: 'Essentia Belle',
    price: 16800,
    rating: 4.3,
    category: 'Unisex',
    description: 'Uplifting solar notes and bright mandarin. Designed to radiate energy and confidence throughout the day.',
    image: 'https://images.unsplash.com/photo-1617814076367-b757c7a7238b?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Mandarin', 'Bergamot'],
      middle: ['Sun-drenched petals', 'Orange Blossom'],
      base: ['Solar Musk', 'White Amber']
    }
  },
  {
    id: '12',
    name: 'Ancient Oud',
    brand: 'Essentia Heritage',
    price: 45000,
    rating: 4.9,
    category: 'Unisex',
    description: 'A deep, complex cultural journey. Real Cambodian oud aged with Bulgarian rose and leather. For the true connoisseur.',
    image: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=800',
    notes: {
      top: ['Bulgarian Rose', 'Coriander'],
      middle: ['Leather', 'Saffron'],
      base: ['Cambodian Oud', 'Patchouli']
    },
    isFeatured: true
  }
];
