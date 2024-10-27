import React, { useMemo, useState } from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { Box, Typography } from '@mui/material';

const mapContainerStyle = {
  width: '100%',
  height: '650px',
};

const GoogleMapComponent = ({ center, locations = [] }) => {
  const [cursorPosition, setCursorPosition] = useState(null);

  // Calculate the average midpoint for centering the map on locations
  const calculatedCenter = useMemo(() => {
    if (locations.length === 0) return center;

    const avgLat = locations.reduce((sum, loc) => sum + loc.latitude, 0) / locations.length;
    const avgLng = locations.reduce((sum, loc) => sum + loc.longitude, 0) / locations.length;

    return { lat: avgLat, lng: avgLng };
  }, [locations, center]);

  const openGoogleMapsDirections = (lat, lng) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(googleMapsUrl, "_blank");
  };

  // Handler to update cursor position on map
  const handleMouseMove = (event) => {
    const { latLng } = event;
    setCursorPosition({
      lat: latLng.lat().toFixed(6),
      lng: latLng.lng().toFixed(6),
    });
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Display cursor position */}
      {cursorPosition && (
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '8px',
            borderRadius: '4px',
            zIndex: 1,
          }}
        >
          <Typography variant="body2">
            Cursor Latitude: {cursorPosition.lat}
          </Typography>
          <Typography variant="body2">
            Cursor Longitude: {cursorPosition.lng}
          </Typography>
        </Box>
      )}

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={calculatedCenter}
        zoom={10}
        options={{ mapTypeControl: false, streetViewControl: false }}
        onMouseMove={handleMouseMove} // Track mouse movement on map
      >
        {locations.map((loc, index) => (
          <MarkerF
            key={index}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            title={loc.name || "Location"}
            onClick={() => openGoogleMapsDirections(loc.latitude, loc.longitude)}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
          />
        ))}
      </GoogleMap>
    </Box>
  );
};

export default GoogleMapComponent;
