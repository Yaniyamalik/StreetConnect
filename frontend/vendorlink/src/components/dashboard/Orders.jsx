import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const Orders = () => {
  const { t } = useLanguage();

  const orders = [
    { id: '1234', items: 'Rice & Dal', amount: '₹2,450', status: 'delivered' },
    { id: '1235', items: 'Spices Mix', amount: '₹890', status: 'processing' },
    { id: '1236', items: 'Vegetables', amount: '₹1,200', status: 'new' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'bg-green-50 border-green-200 text-green-800 bg-green-100',
      processing: 'bg-yellow-50 border-yellow-200 text-yellow-800 bg-yellow-100',
      new: 'bg-blue-50 border-blue-200 text-blue-800 bg-blue-100'
    };
    return colors[status] || colors.new;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800">{t('myOrders')}</h2>
      </div>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className={`flex items-center justify-between p-4 rounded-lg border ${getStatusColor(order.status).split(' ').slice(0, 2).join(' ')}`}>
            <div>
              <p className="font-semibold text-gray-800">{t('order')} #{order.id}</p>
              <p className="text-sm text-gray-600">{order.items} - {order.amount}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status).split(' ').slice(2).join(' ')}`}>
              {t(order.status)}
            </span>
          </div>
        ))}
      </div>
      
      
    </div>
  );
};

export default Orders;