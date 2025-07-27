import React from 'react';

const WarehouseFilters = ({ filters, setFilters, onApplyFilters }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [name]: value
      }
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Amenities */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Amenities</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="has24HourAccess"
                checked={filters.has24HourAccess}
                onChange={handleCheckboxChange}
                className="rounded text-[#e8630a] focus:ring-[#e8630a]"
              />
              <span className="ml-2 text-sm text-gray-600">24/7 Access</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="hasCapsuleStorage"
                checked={filters.hasCapsuleStorage}
                onChange={handleCheckboxChange}
                className="rounded text-[#e8630a] focus:ring-[#e8630a]"
              />
              <span className="ml-2 text-sm text-gray-600">Capsule Storage</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="hasClimateControl"
                checked={filters.hasClimateControl}
                onChange={handleCheckboxChange}
                className="rounded text-[#e8630a] focus:ring-[#e8630a]"
              />
              <span className="ml-2 text-sm text-gray-600">Climate Control</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="hasSecurity"
                checked={filters.hasSecurity}
                onChange={handleCheckboxChange}
                className="rounded text-[#e8630a] focus:ring-[#e8630a]"
              />
              <span className="ml-2 text-sm text-gray-600">24/7 Security</span>
            </label>
          </div>
        </div>

        {/* Location */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Location</h4>
          <select
            name="location"
            value={filters.location}
            onChange={handleSelectChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e8630a]"
          >
            <option value="">All Locations</option>
            <option value="north">North District</option>
            <option value="south">South District</option>
            <option value="east">East District</option>
            <option value="west">West District</option>
            <option value="central">Central District</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range ($/month)</h4>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="min"
              placeholder="Min"
              value={filters.priceRange.min}
              onChange={handlePriceRangeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e8630a]"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              name="max"
              placeholder="Max"
              value={filters.priceRange.max}
              onChange={handlePriceRangeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e8630a]"
            />
          </div>
        </div>

        {/* Availability */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Availability</h4>
          <select
            name="availability"
            value={filters.availability}
            onChange={handleSelectChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e8630a]"
          >
            <option value="">Any Availability</option>
            <option value="available">Available Now</option>
            <option value="limited">Limited Space</option>
            <option value="waitlist">Waitlist Only</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onApplyFilters}
          className="bg-[#e8630a] hover:bg-[#d45a09] text-white px-4 py-2 rounded-md transition-all"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default WarehouseFilters;