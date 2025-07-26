import React from 'react';
import StarRating from './StarRating';

const ProductCard = ({ product, onAddToCart }) => {
  const { id, name, description, price, unit, rating, location, supplier, image, badge } = product;
  
  return (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 relative">
      {badge && (
        <span className={`badge ${badge.color === 'primary' ? 'bg-[#e8630a]' : 'bg-[#2a9d8f]'} text-white`}>
          {badge.text}
        </span>
      )}
      <div className="h-48 overflow-hidden">
        {image}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
          <StarRating rating={rating} />
        </div>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span>{location}</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-[#e8630a]">${price.toFixed(2)}</span>
            <span className="text-sm text-gray-500 ml-1">/ {unit}</span>
          </div>
          <button 
            className="bg-[#2a9d8f] hover:bg-[#248077] text-white px-3 py-1 rounded-md text-sm font-medium transition-all"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
        <div className="mt-3 text-xs text-gray-500">
          <span>Supplier: </span>
          <span className="font-medium">{supplier}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;