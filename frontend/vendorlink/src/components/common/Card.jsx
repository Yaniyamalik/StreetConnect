import React from 'react';

const Card = ({ title, description, icon, iconBgColor }) => {
  return (
    <div className="bg-[#fff8f0] rounded-lg p-8 text-center shadow-lg transform transition hover:-translate-y-2">
      <div 
        className="rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6"
        style={{ backgroundColor: iconBgColor }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;
