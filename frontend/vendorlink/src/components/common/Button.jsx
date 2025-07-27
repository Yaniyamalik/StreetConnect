import React from 'react';

const Button = ({ children, variant = 'primary', onClick, className = '', ...props }) => {
  const baseClasses = "font-medium py-3 px-6 rounded-lg shadow-lg transition transform hover:-translate-y-1";
  
  const variantClasses = {
    primary: "bg-[#e8630a] text-white hover:bg-[#d45a09]",
    secondary: "bg-[#2a9d8f] text-white hover:bg-[#248077]",
    white: "bg-white text-[#e8630a] hover:bg-gray-100",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#e8630a]"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
      