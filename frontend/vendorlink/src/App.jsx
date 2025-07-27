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
// Import other pages as needed

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
        <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/warehouse-locator" element={<WarehouseLocatorPage />} />
          <Route path="/capsule-booking/:warehouseId" element={<CapsuleBookingPage />} />
          {/* Add other routes as needed */}
        </Routes>
      </CartProvider>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

