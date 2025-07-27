import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import LanguageToggle from './LanguaugeToggle';
import { logout } from '../../services/authService';
const Header = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const handlelogout = () => {
    logout
    window.location.href = '/login'; // Redirect to login after logout
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{t('vendorDashboard')}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <span className="text-gray-600 text-lg">
              {t('welcome')}, {user?.name || 'Vendor'}
            </span>
            <button
              onClick={handlelogout}
              className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              {t('logout')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;