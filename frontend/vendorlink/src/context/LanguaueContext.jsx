import React, { createContext, useContext, useState } from 'react';

export const LanguageContext = createContext();

const translations = {
  en: {
    vendorLogin: 'Vendor Login',
    welcomeBack: 'Welcome back! Please sign in to your account',
    phoneNumber: 'Phone Number',
    password: 'Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    noAccount: "Don't have an account?",
    createAccount: 'Create Account',
    fullName: 'Full Name',
    businessName: 'Business Name',
    city: 'City',
    vendorDashboard: 'Vendor Dashboard',
    totalOrders: 'Total Orders',
    revenue: 'Revenue',
    products: 'Products',
    customers: 'Customers',
    myOrders: 'My Orders',
    myWarehouse: 'My Warehouse',
    recommendedSuppliers: 'Recommended Suppliers',
    support: 'Support',
    delivered: 'Delivered',
    processing: 'Processing',
    new: 'New',
    inStock: 'In Stock',
    lowStock: 'Low Stock',
    contact: 'Contact',
    logout: 'Logout'
  },
  hi: {
    vendorLogin: 'विक्रेता लॉगिन',
    welcomeBack: 'वापस स्वागत है! कृपया अपने खाते में साइन इन करें',
    phoneNumber: 'फोन नंबर',
    password: 'पासवर्ड',
    signIn: 'साइन इन करें',
    signUp: 'साइन अप करें',
    noAccount: 'खाता नहीं है?',
    createAccount: 'खाता बनाएं',
    fullName: 'पूरा नाम',
    businessName: 'व्यापार का नाम',
    city: 'शहर',
    vendorDashboard: 'विक्रेता डैशबोर्ड',
    totalOrders: 'कुल ऑर्डर',
    revenue: 'आय',
    products: 'उत्पाद',
    customers: 'ग्राहक',
    myOrders: 'मेरे ऑर्डर',
    myWarehouse: 'मेरा गोदाम',
    recommendedSuppliers: 'सुझाए गए आपूर्तिकर्ता',
    support: 'सहायता',
    delivered: 'डिलीवर किया गया',
    processing: 'प्रोसेसिंग',
    new: 'नया',
    inStock: 'स्टॉक में',
    lowStock: 'कम स्टॉक',
    contact: 'संपर्क करें',
    logout: 'लॉग आउट'
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState('en');

  const toggleLanguage = () => {
    setCurrentLang(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key) => {
    return translations[currentLang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      currentLang,
      toggleLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};