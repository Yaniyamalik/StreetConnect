import React from 'react';

const CartButton = ({ itemCount, onClick }) => {
  return (
    <div className="fixed bottom-6 right-6">
      <button 
        className="bg-[#e8630a] hover:bg-[#d45a09] text-white p-4 rounded-full shadow-lg flex items-center justify-center relative transition-all"
        onClick={onClick}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#2a9d8f] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default CartButton;