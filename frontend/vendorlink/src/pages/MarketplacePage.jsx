import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/marketplace/ProductCard';
import FilterSection from '../components/marketplace/FilterSection';
import CartButton from '../components/marketplace/CartButton';
import Pagination from '../components/marketplace/Pagination';
import { useCart } from '../context/Cartcontext';
import { fetchProducts } from '../services/api';
import { products as sampleProducts } from '../data/marketplaceData';

const MarketplacePage = () => {
  const [activeFilter, setActiveFilter] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from your API
        // const response = await fetchProducts({
        //   page: currentPage,
        //   limit: 8,
        //   category,
        //   location,
        //   minPrice: priceRange.min || undefined,
        //   maxPrice: priceRange.max || undefined,
        //   search: searchQuery || undefined
        // });
        // setProducts(response.products);
        // setTotalPages(response.totalPages);
        
        // For now, we'll use the sample data
        setProducts(sampleProducts);
        setTotalPages(Math.ceil(sampleProducts.length / 8));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };

    getProducts();
  }, [currentPage]); // In a real app, you'd include all filter params here

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    
    // Apply filter logic
    let filteredProducts = [...sampleProducts];
    
    if (filter === 'Daily Deals') {
      filteredProducts = sampleProducts.filter(product => 
        product.badge && product.badge.text === 'Daily Deal'
      );
    } else if (filter === 'Best Rated') {
      filteredProducts = sampleProducts.filter(product => product.rating >= 4);
    } else if (filter === 'Nearby') {
      // In a real app, this would filter based on user location
      filteredProducts = sampleProducts.filter(product => 
        product.location === 'Central Market'
      );
    }
    
    setProducts(filteredProducts);
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    // In a real app, this would trigger a new API call with the filter params
    // For now, we'll filter the sample data
    let filteredProducts = [...sampleProducts];
    
    // Apply category filter
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    // Apply location filter
    if (location) {
      const locationMap = {
        'north': 'North District',
        'south': 'South District',
        'east': 'East District',
        'west': 'West District',
        'central': 'Central Market'
      };
      filteredProducts = filteredProducts.filter(p => 
        p.location === locationMap[location]
      );
    }
    
    // Apply price range filter
    if (priceRange.min) {
      filteredProducts = filteredProducts.filter(p => 
        p.price >= parseFloat(priceRange.min)
      );
    }
    if (priceRange.max) {
      filteredProducts = filteredProducts.filter(p => 
        p.price <= parseFloat(priceRange.max)
      );
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.supplier.toLowerCase().includes(query)
      );
    }
    
    setProducts(filteredProducts);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleCartClick = () => {
    navigate('/cart');
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
      {/* Marketplace Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Marketplace</h1>
        <p className="text-gray-600 mt-2">Find quality raw materials from trusted suppliers</p>
      </div>

      {/* Search and Filter Section */}
      <FilterSection 
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        category={category}
        onCategoryChange={setCategory}
        location={location}
        onLocationChange={setLocation}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        onApplyFilters={handleApplyFilters}
      />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          <div className="mt-6">
            <button 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#e8630a] hover:bg-[#d45a09]"
              onClick={() => {
                setActiveFilter('All Products');
                setSearchQuery('');
                setCategory('');
                setLocation('');
                setPriceRange({ min: '', max: '' });
                setProducts(sampleProducts);
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      )}

      {/* Shopping Cart Button */}
      <CartButton itemCount={cartItems.length} onClick={handleCartClick} />
    </div>
  );
};

export default MarketplacePage;