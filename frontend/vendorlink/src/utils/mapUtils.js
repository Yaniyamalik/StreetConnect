/**
 * Calculates the distance between two coordinates in kilometers
 * @param {Object} coord1 - First coordinate {lat, lng}
 * @param {Object} coord2 - Second coordinate {lat, lng}
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (coord1, coord2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(coord2.lat - coord1.lat);
  const dLon = deg2rad(coord2.lng - coord1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.lat)) * Math.cos(deg2rad(coord2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

/**
 * Converts degrees to radians
 * @param {number} deg - Degrees
 * @returns {number} Radians
 */
const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

/**
 * Gets the user's current location
 * @returns {Promise} Promise that resolves to {lat, lng}
 */
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

/**
 * Sorts warehouses by distance from a given location
 * @param {Array} warehouses - Array of warehouse objects
 * @param {Object} location - Location {lat, lng}
 * @returns {Array} Sorted warehouses
 */
export const sortWarehousesByDistance = (warehouses, location) => {
  return [...warehouses].sort((a, b) => {
    const distanceA = calculateDistance(location, a.coordinates);
    const distanceB = calculateDistance(location, b.coordinates);
    return distanceA - distanceB;
  });
};