import { Typography, TextField, IconButton, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import GoogleMapComponent from '../components/GoogleMapComponent';
import axios from 'axios';

const Maps = ({ location }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Set opacity transition after 3-second delay
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

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
        paddingLeft: "0px !important",
        opacity: visible ? 1 : 0, // Fade in based on visibility
        transition: 'opacity 1.5s ease', // Opacity transition effect
      }}
    >
      {/* Location Details */}
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: 2 }}>
        <Typography variant="h6">Latitude: {location?.lat ?? "N/A"}</Typography>
        <Typography variant="h6">Longitude: {location?.lng ?? "N/A"}</Typography>
      </Box>

      {/* Google Map Component */}
      {location && (
        <Box sx={{ marginTop: 4 }}>
          <GoogleMapComponent 
            center={{ lat: location.lat, lng: location.lng }}
            locations={searchResults} // Pass search results to display as markers
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
      </Box>
    </Box>
  );
};

export default Maps;
