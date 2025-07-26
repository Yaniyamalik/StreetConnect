import React, { useEffect, useRef } from 'react';

const WarehouseMap = ({ warehouses, selectedWarehouse, setSelectedWarehouse }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    // Load Google Maps API script
    const loadGoogleMapsAPI = () => {
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=&libraries=places`;
      googleMapScript.async = true;
      googleMapScript.defer = true;
      window.document.body.appendChild(googleMapScript);
      
      googleMapScript.addEventListener('load', initializeMap);
    };

    // Initialize map
    const initializeMap = () => {
      if (!mapRef.current) return;
      
      // Default center (can be set to user's location or a central point)
      const defaultCenter = { lat: 28.6139, lng: 77.2090 }; // Delhi, India
      
      const mapOptions = {
        center: defaultCenter,
        zoom: 12,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      };
      
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);
      
      // Add markers for warehouses
      addMarkers();
    };

    // Add markers for warehouses
    const addMarkers = () => {
      if (!mapInstanceRef.current || !warehouses.length) return;
      
      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      
      // Create bounds to fit all markers
      const bounds = new window.google.maps.LatLngBounds();
      
      warehouses.forEach(warehouse => {
        const position = { 
          lat: warehouse.coordinates.lat, 
          lng: warehouse.coordinates.lng 
        };
        
        const marker = new window.google.maps.Marker({
          position,
          map: mapInstanceRef.current,
          title: warehouse.name,
          icon: {
            url: selectedWarehouse && selectedWarehouse.id === warehouse.id
              ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new window.google.maps.Size(40, 40)
          }
        });
        
        // Add click event to marker
        marker.addListener('click', () => {
          setSelectedWarehouse(warehouse);
        });
        
        markersRef.current.push(marker);
        bounds.extend(position);
      });
      
      // Fit map to bounds if there are warehouses
      if (warehouses.length > 0) {
        mapInstanceRef.current.fitBounds(bounds);
        
        // Adjust zoom level if there's only one marker
        if (warehouses.length === 1) {
          mapInstanceRef.current.setZoom(15);
        }
      }
    };

    // Update markers when selected warehouse changes
    const updateMarkers = () => {
      if (!mapInstanceRef.current || !markersRef.current.length) return;
      
      markersRef.current.forEach((marker, index) => {
        const warehouse = warehouses[index];
        marker.setIcon({
          url: selectedWarehouse && selectedWarehouse.id === warehouse.id
            ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new window.google.maps.Size(40, 40)
        });
      });
    };

    // Load Google Maps API if not already loaded
    if (!window.google || !window.google.maps) {
      loadGoogleMapsAPI();
    } else {
      initializeMap();
    }

    // Update markers when selected warehouse changes
    if (mapInstanceRef.current) {
      updateMarkers();
    }

    // Cleanup
    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
    };
  }, [warehouses, selectedWarehouse, setSelectedWarehouse]);

  return (
    <div className="h-full min-h-[400px] rounded-lg overflow-hidden shadow-md">
      <div ref={mapRef} className="w-full h-full"></div>
    </div>
  );
};

export default WarehouseMap;