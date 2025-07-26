import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CapsuleDiagram from '../components/warehouse/CapsuleDiagram';
import CapsuleBookingForm from '../components/warehouse/CapsuleBookingForm';
import WarehouseFeatures from '../components/warehouse/WarehouseFeatures';
import FAQ from '../components/warehouse/FAQ';
import { fetchWarehouseById } from '../services/warehouseService';
import { getCapsules } from '../services/capsuleService';

const CapsuleBookingPage = () => {
  const { warehouseId } = useParams();
  const [warehouse, setWarehouse] = useState(null);
  const [capsules, setCapsules] = useState([]);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // In a real app, these would be API calls
        // const warehouseData = await fetchWarehouseById(warehouseId);
        // const capsulesData = await getCapsules(warehouseId);
        
        // Mock data for demonstration
        const warehouseData = {
          id: '1',
          name: 'Central Smart Storage',
          address: '123 Main Street, Central District',
          rating: 4.8,
          reviewCount: 128,
          features: [
            { id: 1, name: '24/7 CCTV', description: 'Continuous surveillance for enhanced security', icon: 'camera' },
            { id: 2, name: 'Biometric Access', description: 'Secure fingerprint entry system', icon: 'fingerprint' },
            { id: 3, name: '24/7 Access', description: 'Access your capsule anytime', icon: 'clock' },
            { id: 4, name: 'Climate Control', description: 'Temperature-controlled environment', icon: 'temperature' },
            { id: 5, name: 'Fire Protection', description: 'Advanced fire detection & suppression', icon: 'fire' },
            { id: 6, name: 'Inventory Management', description: 'Digital tracking of your items', icon: 'inventory' }
          ]
        };
        
        const capsulesData = generateMockCapsules();
        
        setWarehouse(warehouseData);
        setCapsules(capsulesData);
        
        // Select first available capsule by default
        const firstAvailable = capsulesData.find(capsule => capsule.status === 'available');
        if (firstAvailable) {
          setSelectedCapsule(firstAvailable);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load warehouse data. Please try again.');
        setLoading(false);
      }
    };
    
    loadData();
  }, [warehouseId]);

  // Generate mock capsules data
  const generateMockCapsules = () => {
    const sections = ['A', 'B', 'C', 'D'];
    const statuses = ['available', 'booked', 'cold-storage'];
    const capsules = [];
    
    sections.forEach(section => {
      for (let i = 1; i <= 8; i++) {
        const id = `${section.toLowerCase()}${i}`;
        const status = statuses[Math.floor(Math.random() * 3)];
        
        capsules.push({
          id,
          name: `Capsule ${section}${i}`,
          section,
          status: status === 'cold-storage' ? 'available' : status,
          isColdStorage: status === 'cold-storage',
          size: { width: 3, depth: 4, height: 6 },
          capacity: 72,
          maxWeight: 500,
          pricePerDay: status === 'cold-storage' ? 17 : 12,
          x: section === 'A' || section === 'C' ? 100 + (i % 4) * 50 : 500 + (i % 4) * 50,
          y: section === 'A' || section === 'B' ? 150 + Math.floor(i / 5) * 70 : 350 + Math.floor(i / 5) * 70
        });
      }
    });
    
    return capsules;
  };

  const handleCapsuleSelect = (capsule) => {
    setSelectedCapsule(capsule);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e8630a]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      {/* <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">StreetConnect</h1>
            <span className="ml-2 text-sm bg-[#e8630a] text-white px-2 py-0.5 rounded">Vendor</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/dashboard" className="text-gray-600 hover:text-[#e8630a]">Dashboard</Link>
            <Link to="/marketplace" className="text-gray-600 hover:text-[#e8630a]">Marketplace</Link>
            <Link to="/warehouses" className="text-[#e8630a] font-medium">Warehouses</Link>
            <Link to="/orders" className="text-gray-600 hover:text-[#e8630a]">Orders</Link>
            <Link to="/profile" className="text-gray-600 hover:text-[#e8630a]">Profile</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-[#e8630a] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="h-8 w-8 rounded-full bg-[#2a9d8f] text-white flex items-center justify-center font-medium">
              JS
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex text-sm">
            <li className="flex items-center">
              <Link to="/warehouses" className="text-gray-500 hover:text-[#e8630a]">Warehouses</Link>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="flex items-center">
              <Link to={`/warehouses/${warehouseId}`} className="text-gray-500 hover:text-[#e8630a]">{warehouse.name}</Link>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-[#e8630a] font-medium">Capsule Booking</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{warehouse.name}</h1>
          <p className="text-gray-600 mt-1">{warehouse.address} • <span className="text-[#2a9d8f] font-medium">{warehouse.rating} ★</span> ({warehouse.reviewCount} reviews)</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Warehouse Diagram */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Capsule Storage Units</h2>
            
            <CapsuleDiagram 
              capsules={capsules} 
              selectedCapsule={selectedCapsule} 
              onCapsuleSelect={handleCapsuleSelect} 
            />
            
            <WarehouseFeatures features={warehouse.features} />
          </div>
          
          {/* Right Column - Booking Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Book Your Capsule</h2>
            
            {selectedCapsule && (
              <CapsuleBookingForm 
                capsule={selectedCapsule} 
                warehouseId={warehouseId} 
              />
            )}
          </div>
        </div>
        
        {/* FAQ Section */}
        <FAQ />
      </main>

      {/* Footer */}
    
      
    </div>
   );
}; 

export default CapsuleBookingPage;