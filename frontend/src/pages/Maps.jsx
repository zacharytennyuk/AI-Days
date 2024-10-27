import { Typography, TextField, IconButton, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import GoogleMapComponent from '../components/GoogleMapComponent';
import axios from 'axios';

const Maps = ({ location, searchResults, }) => {
  
  const [animatedLat, setAnimatedLat] = useState(0);
  const [animatedLng, setAnimatedLng] = useState(0);

  // Animate latitude and longitude from 0, 0 to actual location
  useEffect(() => {
    if (location) {
      let startTime;
      const duration = 2000;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setAnimatedLat(location.lat * progress);
        setAnimatedLng(location.lng * progress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [location]);

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 4,
        transition: 'opacity 1.5s ease', // Opacity transition effect
      }}
    >
      {/* Display animated Latitude and Longitude */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 2 }}>
        <Typography variant="h6">Your Location</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: 2 }}>
        <Typography variant="h6">Latitude: {animatedLat.toFixed(4)}</Typography>
        <Typography variant="h6">Longitude: {animatedLng.toFixed(4)}</Typography>
      </Box>

      {/* Google Map Component with search results as markers */}
      {location && (
        <Box sx={{ marginTop: 4 }}>
          <GoogleMapComponent 
            center={location}
            locations={searchResults} // Display search results as markers
          />
        </Box>
      )}
    </Box>
  );
};

export default Maps;
