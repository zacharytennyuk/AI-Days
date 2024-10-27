import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

function LocationTracker() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [watchId, setWatchId] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setError('');
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("Location access denied. Please enable location sharing.");
              setLocation(null);
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              setLocation(null);
              break;
            case error.TIMEOUT:
              setError("The request to get your location timed out.");
              setLocation(null);
              break;
            default:
              setError("An unknown error occurred.");
              setLocation(null);
              break;
          }
        }
      );
      setWatchId(id);
    } else {
      setError("Geolocation is not supported by this browser.");
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  return (
    <Box
      sx={{
        maxWidth: 300,
        margin: '20px auto',
        padding: 3,
        borderRadius: '16px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1), inset 0 1px 4px rgba(255, 255, 255, 0.3)',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        Location Tracking
      </Typography>

      {location ? (
        <Typography variant="body1">
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </Typography>
      ) : (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default LocationTracker;
