import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import LanguageToggle from '../common/LanguaugeToggle';
import { signup } from '../../services/authService';
import { useAuth } from '../hooks/useAuth';
const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    username: '',
    shopName: '',
    address: '',
    category: '',

  });

  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('Submitting form data:', formData)
      await signup(formData); // calls the signup API
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please check your details or try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4 w-auto">
      <LanguageToggle />
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('VendorSignUp')}</h1>
          <p className="text-gray-600 text-lg">{t('Create a new Account')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 ">
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">{t('FullName')}</label>
            <input
              type="text"
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData,fullname: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-lg"
              placeholder="Ramesh Kumar"
              required
            />
          </div>
                    <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">{t('UserName')}</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-lg"
              placeholder="rameshkumar"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">{t('Email')}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-lg"
              placeholder="ramesh@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">{t('Phone')}</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-lg"
              placeholder="+91 98765 43210"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">{t('Password')}</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-lg"
              placeholder="••••••••"
              required
            />
          </div>
           <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">{t('ShopName')}</label>
            <input
              type="shopName"
              value={formData.shopName}
              onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-lg"
              placeholder="431"
              required
            />
          </div>
           <div>
            <label className="block text-gray-700 text-lg font-medium mb-2">{t('Address')}</label>
            <input
              type="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-lg"
              placeholder="delhi"
              required
            />
          </div>
          \<div>
  <label className="block text-gray-700 text-lg font-medium mb-2">{t('Category')}</label>
  <select
    value={formData.category}
    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-lg"
    required
  >
    <option value="">Select a category</option>
    <option value="food">Food</option>
    <option value="clothes">Clothes</option>
    <option value="electronics">Electronics</option>
    <option value="general">General</option>
  </select>
</div>

          

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90"
          >
            {t('signUp')}
          </button>

          <div className="text-center">
            <span className="text-gray-600">{t('alreadyAccount')}</span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-purple-600 hover:text-purple-800 font-medium ml-1"
            >
              {t('LogIn')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
