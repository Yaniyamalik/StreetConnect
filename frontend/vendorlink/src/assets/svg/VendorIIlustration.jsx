import React from 'react';

const VendorIllustration = () => {
  return (
    <svg className="w-full h-auto" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      {/* Food Cart */}
      <rect x="100" y="200" width="180" height="120" rx="8" fill="#e8630a" />
      <rect x="100" y="180" width="180" height="30" rx="8" fill="#d45a09" />
      <rect x="120" y="150" width="140" height="30" rx="8" fill="#f4a261" />
      <circle cx="130" cy="320" r="15" fill="#333" />
      <circle cx="250" cy="320" r="15" fill="#333" />
      
      {/* Vendor */}
      <circle cx="170" cy="230" r="20" fill="#ffddd2" />
      <rect x="160" y="250" width="20" height="30" fill="#ffddd2" />
      <rect x="155" y="250" width="30" height="10" fill="#e9c46a" />
      
      {/* Warehouse */}
      <rect x="350" y="180" width="150" height="140" fill="#2a9d8f" />
      <polygon points="350,180 425,120 500,180" fill="#248077" />
      <rect x="380" y="220" width="40" height="60" fill="#e9c46a" />
      <rect x="430" y="220" width="40" height="60" fill="#e9c46a" />
      
      {/* Connection Line */}
      <path d="M280 250 Q 315 200 350 250" stroke="#e8630a" strokeWidth="4" strokeDasharray="10,5" fill="none" />
      <circle cx="315" cy="225" r="15" fill="#e8630a" />
      <text x="310" y="230" fontSize="20" fill="white">↔</text>
    </svg>
  );
};

export default VendorIllustration;
      