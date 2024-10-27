import { Typography, TextField, IconButton, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import GoogleMapComponent from '../components/GoogleMapComponent';
import axios from 'axios';

const Maps = ({ location }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [animatedLat, setAnimatedLat] = useState(0);
  const [animatedLng, setAnimatedLng] = useState(0);
  const [visible, setVisible] = useState(false); // Track visibility for fade-in effect

  // Animate latitude and longitude from 0, 0 to actual location
  useEffect(() => {
    if (location) {
      let startTime;
      const duration = 2000;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setAnimatedLat(0 + (location.lat - 0) * progress);
        setAnimatedLng(0 + (location.lng - 0) * progress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setVisible(true); // Set visible after animation completes
        }
      };

      requestAnimationFrame(animate);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/search-place", {
        query: query,
        location: [location.lat, location.lng],
        radius: 5000,
      });
      setSearchResults(response.data.places || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 2,
        opacity: visible ? 1 : 0, // Control opacity for fade-in
        transition: 'opacity 1.5s ease', // Opacity transition effect
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: 2 }}>
        <Typography variant="h6">Latitude: {animatedLat.toFixed(4)}</Typography>
        <Typography variant="h6">Longitude: {animatedLng.toFixed(4)}</Typography>
      </Box>

      {/* Google Map Component */}
      {location && (
        <Box sx={{ marginTop: 4 }}>
          <GoogleMapComponent 
            center={{ lat: location.lat, lng: location.lng }}
            locations={searchResults} // Display search results as markers
          />
        </Box>
      )}

      {/* Search Form */}
      <Box
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          width: '100%',
          maxWidth: '100%',
          marginInline: 'auto',
          justifyContent: 'center',
          mb: 2,
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Search places"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          sx={{
            maxWidth: '75%',
          }}
        />
        <IconButton color="primary" type="submit" size="large">
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Maps;
