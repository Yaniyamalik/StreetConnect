// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
// import AboutPage from './pages/AboutPage';
// import MarketplacePage from './pages/MarketplacePage';
// import ContactPage from './pages/ContactPage';
 import './styles/tailwind.css';
 import { CartProvider } from './context/CartContext';
import MarketplacePage from './pages/MarketplacePage';
import WarehouseLocatorPage from './pages/WarehouseLocatorPage';
import CapsuleBookingPage from './pages/CapsuleBookingPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguaueContext';
import Dashboard from './components/Dashboard/Dashboard';
// Import other pages as needed

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <AuthProvider>
      <LanguageProvider>
        <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/warehouse-locator" element={<WarehouseLocatorPage />} />
          <Route path="/capsule-booking/:warehouseId" element={<CapsuleBookingPage />} />
          <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other routes as needed */}
        </Routes>
      </CartProvider>
      </LanguageProvider>
    </AuthProvider>
        
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;