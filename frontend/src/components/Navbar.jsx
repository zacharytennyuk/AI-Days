import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static" color="background" sx={{ boxShadow: 'none', padding: '0 20px' }}>
      <Toolbar>
        <Typography variant="h5" component="div" fontWeight="bold" color="primary" sx={{ flexGrow: 1 }}>
          FirstWave
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button sx={{ color: 'black' }}>Home</Button>
          </Link>
          <Link to="/maps" style={{ textDecoration: 'none' }}>
            <Button sx={{ color: 'black' }}>Maps</Button>
          </Link>
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <Button sx={{ color: 'black' }}>About</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
