import { Typography } from '@mui/material';
import {React, useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';

const Maps = () => {
  const handleSubmit = () => {
    console.log("Form submitted!");
  };

  const getLocation = () => {
    return {location : "Florida", long : 10.543454, lat : 21.1234, alt: 12.3413}
  }

  const [location, setLocation] = useState([])

  useEffect(() => {
    setLocation(getLocation())
  }, [])

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)", 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 2,
      }}
    >
      <Box>
      <Typography sx={{marginTop: "40px"}} variant="h4" align="center" gutterBottom>
      {location["location"]}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          mb: 2,
          alignItems: 'center',
          marginTop: '40px'
        }}
      >
        <Typography variant="h6">Latitude: {location["lat"]}</Typography>
        <Typography variant="h6">Longitude: {location["long"]}</Typography>
        <Typography variant="h6">Altitude: {location["alt"]}</Typography>
      </Box>
      </Box>
      <Box>

      </Box>
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
          mb: 2, // Adds margin at the bottom for spacing
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextField
          label="Enter your text"
          variant="outlined"
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
