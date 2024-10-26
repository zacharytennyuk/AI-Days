import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Navbar() {
  return (
    <AppBar position="static" color="background" sx={{ boxShadow: 'none', padding: '0 20px' }}>
      <Toolbar>
        <Typography variant="h5" component="div" fontWeight="bold" color="primary" sx={{ flexGrow: 1 }}>
          FirstWave
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit">View</Button>
          <Button color="inherit">Resources</Button>
          <Button color="inherit">About</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
