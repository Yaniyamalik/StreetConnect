import React from 'react';
import { Link } from 'react-router-dom';

const WarehouseCard = ({ warehouse }) => {
  const {
    id,
    name,
    location,
    address,
    rating,
    reviewCount,
    pricePerMonth,
    features,
    imageUrl,
    availability
  } = warehouse;

  // Function to render availability badge
  const renderAvailabilityBadge = () => {
    if (availability === 'available') {
      return <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">Available Now</span>;
    } else if (availability === 'limited') {
      return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">Limited Space</span>;
    } else {
      return <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">Waitlist Only</span>;
    }
  };

  // Function to render stars for rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg 
          key={i} 
          className={`w-4 h-4 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          {renderAvailabilityBadge()}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
          <div className="flex items-center">
            <div className="flex mr-1">
              {renderStars(rating)}
            </div>
            <span className="text-sm text-gray-600">({reviewCount})</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span>{address}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {features.map((feature, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded"
            >
              {feature}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-[#e8630a]">₹{pricePerMonth}</span>
            <span className="text-sm text-gray-500">/month</span>
          </div>
          <Link 
            to={`/capsule-booking/${id}`}
            className="bg-[#2a9d8f] hover:bg-[#248077] text-white px-4 py-2 rounded-md text-sm font-medium transition-all"
          >
            Book Slot
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WarehouseCard;