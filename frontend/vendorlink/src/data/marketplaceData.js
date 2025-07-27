import React from 'react';
//import BasmatiRice from '../assets/marketplaceImages/basmatiRice.jpg';
//import ChiliPowder from '../assets/marketplaceImages/chiliPowder.jpg';
//import CookingOil from '../assets/marketplaceImages/cookingOil.jpg';
//import FreshOnion from '../assets/marketplaceImages/freshOnion.jpg';
//import tomato from '../assets/marketplaceImages/tomato.jpg';

export const products = [
  {
    id: 1,
    name: 'Fresh Tomatoes',
    description: 'Premium quality tomatoes, perfect for sauces and salads.',
    price: 28,
    unit: 'kg',
    rating: 5,
    location: 'Central Market',
    supplier: 'Green Farms Co.',
    image: '/images/tomato.jpg',
    badge: {
      text: 'Daily Deal',
      color: 'primary'
    },
    category: 'vegetables'
  },
  {
    id: 2,
    name: 'Basmati Rice',
    description: 'Premium long-grain aromatic rice, perfect for biryanis.',
    price: 120,
    unit: 'kg',
    rating: 4,
    location: 'East District',
    supplier: 'Royal Grains Ltd.',
    image: '/images/basmatiRice.jpg',
    category: 'grains'
  },
  {
    id: 3,
    name: 'Cooking Oil',
    description: 'Pure sunflower oil, cholesterol-free and rich in vitamin E.',
    price: 150,
    unit: 'liter',
    rating: 5,
    location: 'South District',
    supplier: 'Golden Oils Inc.',
    //image: CookingOil,
    badge: {
      text: 'Best Seller',
      color: 'secondary'
    },
    category: 'oils'
  },
  {
    id: 4,
    name: 'Fresh Onions',
    description: 'Medium-sized red onions, perfect for everyday cooking.',
    price: 25,
    unit: 'kg',
    rating: 3,
    location: 'West District',
    supplier: 'Fresh Harvest Co.',
   // image: FreshOnion,
    category: 'vegetables'
  },
  {
    id: 5,
    name: 'Chili Powder',
    description: 'Premium quality chili powder, perfect heat level for all dishes.',
    price: 45,
    unit: '100g',
    rating: 5,
    location: 'North District',
    supplier: 'Spice World Inc.',
    //image: ChiliPowder,
    badge: {
      text: 'Daily Deal',
      color: 'primary'
    },
    category: 'spices'
  },
  {
    id: 6,
    name: 'Wheat Flour',
    description: 'All-purpose wheat flour, perfect for breads, rotis and other baked goods.',
    price: 35,
    unit: 'kg',
    rating: 4,
    location: 'Central Market',
    supplier: 'Harvest Mills Ltd.',
    image: '', // Add image when available
    category: 'grains'
  },
  {
    id: 7,
    name: 'Turmeric Powder',
    description: 'Organic turmeric powder with high curcumin content, freshly ground.',
    price: 60,
    unit: '100g',
    rating: 5,
    location: 'South District',
    supplier: 'Organic Spice Co.',
    image: '', // Add image when available
    badge: {
      text: 'Best Seller',
      color: 'secondary'
    },
    category: 'spices'
  },
  {
    id: 8,
    name: 'Yogurt',
    description: 'Fresh plain yogurt, perfect for cooking and marinades.',
    price: 30,
    unit: '500g',
    rating: 4,
    location: 'North District',
    supplier: 'Fresh Dairy Farms',
    image: '', // Add image when available
    category: 'dairy'
  }
];
