// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx'; // Assuming Footer is directly in components/Footer.jsx
import HomePage from './pages/HomePage.jsx';
import './styles/tailwind.css';
import { CartProvider } from './context/CartContext.jsx';
import MarketplacePage from './pages/MarketplacePage.jsx';
import WarehouseLocatorPage from './pages/WarehouseLocatorPage.jsx';
import CapsuleBookingPage from './pages/CapsuleBookingPage.jsx';
import SupplierLoginPage from './pages/SupplierLoginPage.jsx';

// --- ENSURE THESE IMPORTS ARE PRESENT AND CORRECTLY POINT TO GENERAL PAGES ---
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import DashboardPage from './pages/SupplierDashboardPage.jsx'; // THIS IS THE GENERAL DashboardPage.jsx
// --- END ENSURE IMPORTS ---

import { AuthProvider, useAuth } from './context/AuthContext.jsx'; // Import AuthProvider and useAuth

// NEW: Create an inner component that will consume AuthContext
function AppContent() {
  const { user, loading: authLoading } = useAuth(); // <--- This is where the error occurs

  // Show a loading indicator while AuthProvider is checking localStorage
  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter">Loading application...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Navbar also uses useAuth, so it's fine here */}
      <main className="flex-grow">
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/warehouse-locator" element={<WarehouseLocatorPage />} />
            <Route path="/capsule-booking/:warehouseId" element={<CapsuleBookingPage />} />
            <Route path="/supplier-login" element={<SupplierLoginPage />} />

            {/* General Login & Register Pages */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={user ? <DashboardPage /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/supplier-dashboard"
              element={user && user.role === 'supplier' ? <SupplierDashboardPage /> : <Navigate to="/login" replace />}
            />

            {/* Temporary Dev Route - REMOVE THIS LATER */}
            {/* <Route path="/dev-supplier-dashboard" element={<SupplierDashboardPage />} /> */}

            {/* Add other routes as needed */}
          </Routes>
        </CartProvider>
      </main>
      <Footer />
    </div>
  );
}
// --- END NEW AppContent component ---


function App() {
  return (
    <Router>
      <AuthProvider> {/* AuthProvider MUST wrap components that useAuth */}
        <AppContent /> {/* Render the new AppContent component here */}
      </AuthProvider>
    </Router>
  );
}

export default App;