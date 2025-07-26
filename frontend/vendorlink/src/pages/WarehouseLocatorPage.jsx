import React, { useState, useEffect } from 'react';
import SearchBar from '../components/warehouse/SearchBar';
import WarehouseFilters from '../components/warehouse/WarehouseFilter';
import WarehouseCard from '../components/warehouse/WarehouseCard';
import WarehouseMap from '../components/warehouse/WarehouseMap';
import InfoPanel from '../components/warehouse/InfoPanel';
import { fetchWarehouses } from '../services/warehouseService';
import { getUserLocation, sortWarehousesByDistance } from '../utils/mapUtils';

// Sample warehouse data (in a real app, this would come from the API)
const sampleWarehouses = [
  {
    id: '1',
    name: 'Central Smart Storage',
    location: 'Central District',
    address: '123 Main St, Central District',
    rating: 4.5,
    reviewCount: 128,
    pricePerMonth: 299,
    features: ['24/7 Access', 'Climate Control', 'Security'],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    availability: 'available',
    coordinates: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: '2',
    name: 'North District Warehouse',
    location: 'North District',
    address: '456 North Ave, North District',
    rating: 4.2,
    reviewCount: 86,
    pricePerMonth: 249,
    features: ['Capsule Storage', 'Loading Dock'],
    imageUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    availability: 'limited',
    coordinates: { lat: 28.7041, lng: 77.1025 }
  },
  {
    id: '3',
    name: 'South Premium Storage',
    location: 'South District',
    address: '789 South Blvd, South District',
    rating: 4.8,
    reviewCount: 210,
    pricePerMonth: 349,
    features: ['24/7 Access', 'Climate Control', 'Capsule Storage', 'Security'],
    imageUrl: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    availability: 'available',
    coordinates: { lat: 28.5244, lng: 77.1855 }
  },
  {
    id: '4',
    name: 'East Side Storage Solutions',
    location: 'East District',
    address: '101 East Road, East District',
    rating: 3.9,
    reviewCount: 64,
    pricePerMonth: 199,
    features: ['Loading Dock', 'Forklift Available'],
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    availability: 'waitlist',
    coordinates: { lat: 28.6280, lng: 77.2789 }
  },
  {
    id: '5',
    name: 'West Modern Warehouse',
    location: 'West District',
    address: '202 West Street, West District',
    rating: 4.4,
    reviewCount: 97,
    pricePerMonth: 279,
    features: ['24/7 Access', 'Security', 'Pallet Storage'],
    imageUrl: 'https://images.unsplash.com/photo-1600494448850-6b1e00b28fd5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    availability: 'available',
    coordinates: { lat: 28.6129, lng: 77.1575 }
  },
  {
    id: '6',
    name: 'Central Capsule Storage',
    location: 'Central District',
    address: '303 Center Ave, Central District',
    rating: 4.7,
    reviewCount: 156,
    pricePerMonth: 329,
    features: ['Capsule Storage', 'Climate Control', '24/7 Access'],
    imageUrl: 'https://images.unsplash.com/photo-1607358961652-9e47d8908c47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    availability: 'limited',
    coordinates: { lat: 28.6329, lng: 77.2195 }
  }
];

const WarehouseLocatorPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    has24HourAccess: false,
    hasCapsuleStorage: false,
    hasClimateControl: false,
    hasSecurity: false,
    location: '',
    priceRange: { min: '', max: '' },
    availability: ''
  });
  const [warehouses, setWarehouses] = useState([]);
  const [filteredWarehouses, setFilteredWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Fetch warehouses on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from your API
        // const response = await fetchWarehouses();
        // setWarehouses(response.warehouses);
        
        // For now, we'll use the sample data
        setWarehouses(sampleWarehouses);
        setFilteredWarehouses(sampleWarehouses);
        
        // Try to get user's location
        try {
          const location = await getUserLocation();
          setUserLocation(location);
          
          // Sort warehouses by distance from user
          const sortedWarehouses = sortWarehousesByDistance(sampleWarehouses, location);
          setFilteredWarehouses(sortedWarehouses);
        } catch (locationError) {
          console.warn('Could not get user location:', locationError);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch warehouses. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredWarehouses(warehouses);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = warehouses.filter(warehouse => 
      warehouse.name.toLowerCase().includes(query) ||
      warehouse.location.toLowerCase().includes(query) ||
      warehouse.address.toLowerCase().includes(query)
    );
    
    setFilteredWarehouses(results);
  };

  // Handle filter application
  const handleApplyFilters = () => {
    let results = [...warehouses];
    
    // Filter by 24/7 access
    if (filters.has24HourAccess) {
      results = results.filter(warehouse => 
        warehouse.features.includes('24/7 Access')
      );
    }
    
    // Filter by capsule storage
    if (filters.hasCapsuleStorage) {
      results = results.filter(warehouse => 
        warehouse.features.includes('Capsule Storage')
      );
    }
    
    // Filter by climate control
    if (filters.hasClimateControl) {
      results = results.filter(warehouse => 
        warehouse.features.includes('Climate Control')
      );
    }
    
    // Filter by security
    if (filters.hasSecurity) {
      results = results.filter(warehouse => 
        warehouse.features.includes('Security')
      );
    }
    
    // Filter by location
    if (filters.location) {
      const locationMap = {
        'north': 'North District',
        'south': 'South District',
        'east': 'East District',
        'west': 'West District',
        'central': 'Central District'
      };
      results = results.filter(warehouse => 
        warehouse.location === locationMap[filters.location]
      );
    }
    
    // Filter by price range
    if (filters.priceRange.min) {
      results = results.filter(warehouse => 
        warehouse.pricePerMonth >= parseFloat(filters.priceRange.min)
      );
    }
    if (filters.priceRange.max) {
      results = results.filter(warehouse => 
        warehouse.pricePerMonth <= parseFloat(filters.priceRange.max)
      );
    }
    
    // Filter by availability
    if (filters.availability) {
      results = results.filter(warehouse => 
        warehouse.availability === filters.availability
      );
    }
    
    // Apply search query if present
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(warehouse => 
        warehouse.name.toLowerCase().includes(query) ||
        warehouse.location.toLowerCase().includes(query) ||
        warehouse.address.toLowerCase().includes(query)
      );
    }
    
    setFilteredWarehouses(results);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e8630a]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Warehouse Locator</h1>
        <p className="text-gray-600 mt-2">Find and book storage space for your inventory</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          onSearch={handleSearch} 
        />
      </div>

      {/* Filters */}
      <WarehouseFilters 
        filters={filters} 
        setFilters={setFilters} 
        onApplyFilters={handleApplyFilters} 
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Warehouse Listings */}
        <div className="lg:col-span-2">
          {filteredWarehouses.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No warehouses found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
              <div className="mt-6">
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#e8630a] hover:bg-[#d45a09]"
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      has24HourAccess: false,
                      hasCapsuleStorage: false,
                      hasClimateControl: false,
                      hasSecurity: false,
                      location: '',
                      priceRange: { min: '', max: '' },
                      availability: ''
                    });
                    setFilteredWarehouses(warehouses);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredWarehouses.map(warehouse => (
                <div 
                  key={warehouse.id} 
                  onClick={() => setSelectedWarehouse(warehouse)}
                  className={`cursor-pointer ${selectedWarehouse && selectedWarehouse.id === warehouse.id ? 'ring-2 ring-[#e8630a]' : ''}`}
                >
                  <WarehouseCard warehouse={warehouse} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Map */}
          <div className="h-[400px]">
            <WarehouseMap 
              warehouses={filteredWarehouses} 
              selectedWarehouse={selectedWarehouse}
              setSelectedWarehouse={setSelectedWarehouse}
            />
          </div>
          
          {/* Info Panel */}
          <InfoPanel />
        </div>
      </div>
    </div>
  );
};

export default WarehouseLocatorPage;
