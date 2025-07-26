import React from 'react';

const InfoPanel = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Why Smart Warehouses?</h3>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-[#e8630a] rounded-full p-2 mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-800">Enhanced Security</h4>
            <p className="text-sm text-gray-600">24/7 surveillance, biometric access, and dedicated security personnel to keep your inventory safe.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-[#e8630a] rounded-full p-2 mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-800">Efficient Operations</h4>
            <p className="text-sm text-gray-600">Automated inventory management, quick access, and streamlined logistics for faster business operations.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-[#e8630a] rounded-full p-2 mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-800">Flexible Access</h4>
            <p className="text-sm text-gray-600">Access your inventory 24/7 with our smart access system, allowing you to manage your business on your schedule.</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-[#e8630a] rounded-full p-2 mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-800">Climate Control</h4>
            <p className="text-sm text-gray-600">Maintain optimal conditions for your products with temperature and humidity-controlled storage spaces.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <button className="bg-[#2a9d8f] hover:bg-[#248077] text-white px-4 py-2 rounded-md text-sm font-medium transition-all w-full">
          Learn More About Smart Warehouses
        </button>
      </div>
    </div>
  );
};

export default InfoPanel;