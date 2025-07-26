import React from 'react';
import TomatoSVG from '../assets/svgs/TomatoSVG';
import RiceSVG from '../assets/svgs/RiceSVG';
// import OilSVG from '../assets/svgs/OilSVG';
// import OnionSVG from '../assets/svgs/OnionSVG';
// import ChiliSVG from '../assets/svgs/ChiliSVG';
// import FlourSVG from '../assets/svgs/FlourSVG';
// import TurmericSVG from '../assets/svgs/TurmericSVG';
// import YogurtSVG from '../assets/svgs/YogurtSVG';

export const products = [
  {
    id: 1,
    name: 'Fresh Tomatoes',
    description: 'Premium quality tomatoes, perfect for sauces and salads.',
    price: 2.49,
    unit: 'kg',
    rating: 5,
    location: 'Central Market',
    supplier: 'Green Farms Co.',
    // image: <TomatoSVG />,
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
    price: 3.99,
    unit: 'kg',
    rating: 4,
    location: 'East District',
    supplier: 'Royal Grains Ltd.',
    // image: <RiceSVG />,
    category: 'grains'
  },
  {
   id: 3,
    name: 'Cooking Oil',
    description: 'Pure sunflower oil, cholesterol-free and rich in vitamin E.',
    price: 4.50,
    unit: 'liter',
    rating: 5,
    location: 'South District',
    supplier: 'Golden Oils Inc.',
    // image: <OilSVG />,
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
    price: 1.25,
    unit: 'kg',
    rating: 3,
    location: 'West District',
    supplier: 'Fresh Harvest Co.',
    // image: <OnionSVG />,
    category: 'vegetables'
  },
  {
    id: 5,
    name: 'Chili Powder',
    description: 'Premium quality chili powder, perfect heat level for all dishes.',
    price: 2.99,
    unit: '100g',
    rating: 5,
    location: 'North District',
    supplier: 'Spice World Inc.',
    // image: <ChiliSVG />,
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
    price: 1.75,
    unit: 'kg',
    rating: 4,
    location: 'Central Market',
    supplier: 'Harvest Mills Ltd.',
    // image: <FlourSVG />,
    category: 'grains'
  },
  {
    id: 7,
    name: 'Turmeric Powder',
    description: 'Organic turmeric powder with high curcumin content, freshly ground.',
    price: 3.50,
    unit: '100g',
    rating: 5,
    location: 'South District',
    supplier: 'Organic Spice Co.',
    // image: <TurmericSVG />,
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
    price: 2.25,
    unit: '500g',
    rating: 4,
    location: 'North District',
    supplier: 'Fresh Dairy Farms',
    // image: <YogurtSVG />,
    category: 'dairy'
  }
];