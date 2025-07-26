import React, { useState, useEffect } from 'react';
import { createBooking } from '../../services/bookingService';

const CapsuleBookingForm = ({ capsule, warehouseId }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [options, setOptions] = useState({
    coldStorage: capsule.isColdStorage,
    humidityControl: false,
    insurance: false
  });
  const [accessSchedule, setAccessSchedule] = useState('24-7');
  const [notes, setNotes] = useState('');
  const [priceBreakdown, setPriceBreakdown] = useState({
    baseRate: 0,
    coldStorage: 0,
    humidityControl: 0,
    insurance: 0,
    serviceFee: 25,
    total: 0,
    days: 0
  });

  // Set default dates (today and 30 days from now)
  useEffect(() => {
    const today = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);
    
    setStartDate(formatDate(today));
    setEndDate(formatDate(thirtyDaysLater));
  }, []);

  // Update price calculation when relevant fields change
  useEffect(() => {
    if (startDate && endDate) {
      calculatePrice();
    }
  }, [startDate, endDate, options, capsule]);

  // Format date for input
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Calculate price based on selected options and duration
  const calculatePrice = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) return;
    
    const baseRate = capsule.pricePerDay * days;
    const coldStorageCost = (capsule.isColdStorage || options.coldStorage) ? 5 * days : 0;
    const humidityCost = options.humidityControl ? 3 * days : 0;
    const insuranceCost = options.insurance ? 2 * days : 0;
    const serviceFee = 25;
    const total = baseRate + coldStorageCost + humidityCost + insuranceCost + serviceFee;
    
    setPriceBreakdown({
      baseRate,
      coldStorage: coldStorageCost,
      humidityControl: humidityCost,
      insurance: insuranceCost,
      serviceFee,
      total,
      days
    });
  };

  // Handle option changes
  const handleOptionChange = (e) => {
    const { name, checked } = e.target;
    setOptions(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const bookingData = {
        warehouseId,
        capsuleId: capsule.id,
        startDate,
        endDate,
        options,
        accessSchedule,
        notes,
        totalPrice: priceBreakdown.total
      };
      
      // In a real app, this would be an API call
      // await createBooking(bookingData);
      
      alert('Booking successful! You will receive a confirmation email shortly.');
    } catch (error) {
      alert('Failed to create booking. Please try again.');
      console.error('Booking error:', error);
    }
  };

  return (
    <div>
      {/* Selected Capsule Info */}
      <div className="mb-6 p-4 bg-[#e8630a] bg-opacity-5 border border-[#e8630a] border-opacity-20 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-800">Capsule {capsule.id.toUpperCase()}</h3>
            <p className="text-sm text-gray-600">
              Section {capsule.section}, {capsule.isColdStorage ? 'Cold Storage' : 'Standard Storage'}
            </p>
          </div>
          <span className="text-[#e8630a] font-bold">${capsule.pricePerDay}/day</span>
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-gray-500">Size</p>
            <p className="text-sm font-medium">
              {capsule.size.width} × {capsule.size.depth} × {capsule.size.height} ft
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Capacity</p>
            <p className="text-sm font-medium">{capsule.capacity} cubic ft</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Max Weight</p>
            <p className="text-sm font-medium">{capsule.maxWeight} kg</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Type</p>
            <p className="text-sm font-medium">{capsule.isColdStorage ? 'Cold Storage' : 'Standard'}</p>
          </div>
        </div>
      </div>
      
      {/* Booking Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Booking Period</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                <input 
                  type="date" 
                  className="date-picker w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e8630a]" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={formatDate(new Date())}
                  required 
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">End Date</label>
                <input 
                  type="date" 
                  className="date-picker w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e8630a]" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate ? formatDate(new Date(new Date(startDate).getTime() + 86400000)) : ''}
                  required 
                />
              </div>
            </div>
          </div>
          
          {/* Storage Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Storage Options</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  name="coldStorage"
                  checked={options.coldStorage || capsule.isColdStorage}
                  onChange={handleOptionChange}
                  disabled={capsule.isColdStorage}
                  className="rounded text-[#e8630a] focus:ring-[#e8630a]" 
                />
                <span className="ml-2 text-sm text-gray-600">Cold Storage (+$5/day)</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  name="humidityControl"
                  checked={options.humidityControl}
                  onChange={handleOptionChange}
                  className="rounded text-[#e8630a] focus:ring-[#e8630a]" 
                />
                <span className="ml-2 text-sm text-gray-600">Humidity Control (+$3/day)</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  name="insurance"
                  checked={options.insurance}
                  onChange={handleOptionChange}
                  className="rounded text-[#e8630a] focus:ring-[#e8630a]" 
                />
                <span className="ml-2 text-sm text-gray-600">Insurance Coverage (+$2/day)</span>
              </label>
            </div>
          </div>
          
          {/* Access Schedule */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Access Schedule</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e8630a]"
              value={accessSchedule}
              onChange={(e) => setAccessSchedule(e.target.value)}
            >
              <option value="24-7">24/7 Access (Default)</option>
              <option value="business-hours">Business Hours Only (8 AM - 6 PM)</option>
              <option value="custom">Custom Schedule</option>
            </select>
          </div>
          
          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e8630a]" 
              rows="3" 
              placeholder="Any special requirements or instructions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          
          {/* Price Breakdown */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Price Breakdown</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Rate ({priceBreakdown.days} days)</span>
                <span className="text-gray-800">${priceBreakdown.baseRate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cold Storage</span>
                <span className="text-gray-800">${priceBreakdown.coldStorage.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Humidity Control</span>
                <span className="text-gray-800">${priceBreakdown.humidityControl.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Insurance</span>
                <span className="text-gray-800">${priceBreakdown.insurance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee</span>
                <span className="text-gray-800">${priceBreakdown.serviceFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-1 mt-1 flex justify-between font-medium">
                <span>Total</span>
                <span>${priceBreakdown.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Book Now Button */}
          <button 
            type="submit" 
            className="w-full bg-[#e8630a] hover:bg-[#d45a09] text-white py-3 rounded-lg font-medium transition-all"
          >
            Book Now
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            By booking, you agree to our <a href="#" className="text-[#e8630a]">Terms of Service</a> and <a href="#" className="text-[#e8630a]">Cancellation Policy</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default CapsuleBookingForm;