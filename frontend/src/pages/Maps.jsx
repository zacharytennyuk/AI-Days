import { Typography, TextField, IconButton, Box } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';

const Maps = (props) => {
  const handleSubmit = () => {
    console.log("Form submitted!");
  };

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
      {/* Location Details */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 4,
          marginTop: 2,
        }}
      >
        <Typography variant="h6">Latitude: {props.location?.lat ?? "N/A"}</Typography>
        <Typography variant="h6">Longitude: {props.location?.lng ?? "N/A"}</Typography>
      </Box>

      {/* Form Section */}
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
