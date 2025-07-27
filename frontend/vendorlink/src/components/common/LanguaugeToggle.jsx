import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const LanguageToggle = () => {
  const { currentLang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 text-sm font-medium"
    >
      {currentLang === 'en' ? 'English' : 'हिंदी'} | {currentLang === 'en' ? 'हिंदी' : 'English'}
    </button>
  );
};

export default LanguageToggle;