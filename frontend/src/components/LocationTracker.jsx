import { useEffect } from 'react';

function LocationTracker({ setLocation }) {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            alt: position.coords.altitude,
          });
        },
        (error) => {
          console.error("Error accessing location:", error);
          setLocation(null);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocation(null);
    }
  }, [setLocation]);

  return null; // This component doesn’t render anything visible
}

export default LocationTracker;
