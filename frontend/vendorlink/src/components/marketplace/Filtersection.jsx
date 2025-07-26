import React from 'react';

const FilterSection = ({ 
  activeFilter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange,
  category,
  onCategoryChange,
  location,
  onLocationChange,
  priceRange,
  onPriceRangeChange,
  onApplyFilters
}) => {
  const filters = ['All Products', 'Daily Deals', 'Best Rated', 'Nearby'];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/3">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8630a] focus:border-transparent"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <svg className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button 
              key={filter}
              className={`filter-pill px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter 
                  ? 'bg-[#e8630a] text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => onFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-4">
          {/* Category Filter */}
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e8630a]"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains & Rice</option>
              <option value="spices">Spices</option>
              <option value="oils">Cooking Oils</option>
              <option value="dairy">Dairy Products</option>
            </select>
          </div>

          {/* Location Filter */}
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select 
              className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e8630a]"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="north">North District</option>
              <option value="south">South District</option>
              <option value="east">East District</option>
              <option value="west">West District</option>
              <option value="central">Central Market</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                placeholder="Min" 
                className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e8630a]"
                value={priceRange.min}
                onChange={(e) => onPriceRangeChange({...priceRange, min: e.target.value})}
              />
              <span className="text-gray-500">-</span>
              <input 
                type="number" 
                placeholder="Max" 
                className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e8630a]"
                value={priceRange.max}
                onChange={(e) => onPriceRangeChange({...priceRange, max: e.target.value})}
              />
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className="w-full md:w-auto flex items-end">
            <button 
              className="bg-[#e8630a] hover:bg-[#d45a09] text-white px-4 py-2 rounded-md transition-all"
              onClick={onApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;