import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const Warehouse = () => {
  const { t } = useLanguage();

  const inventory = [
    { name: 'Basmati Rice', quantity: '50 kg', status: 'inStock' },
    { name: 'Turmeric Powder', quantity: '5 kg', status: 'lowStock' },
    { name: 'Red Lentils', quantity: '25 kg', status: 'inStock' }
  ];

  const getStatusColor = (status) => {
    return status === 'inStock' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800">{t('myWarehouse storage')}</h2>
      </div>
      
      <div className="space-y-4">
        {inventory.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-600">{item.quantity} {t('available')}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
              {t(item.status)}
            </span>
          </div>
        ))}
      </div>
      
      
    </div>
  );
};

export default Warehouse;