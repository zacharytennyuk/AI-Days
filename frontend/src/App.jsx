import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Links from './routes/Links';
import LocationTracker from './components/LocationTracker';
import "./App.css"
import React, { useState, useEffect } from 'react';


const theme = createTheme({
  palette: {
    mode: 'light', // Change to 'dark' for dark mode
    primary: {
      main: '#7678ed', // Customize primary color
    },
    secondary: {
      main: '#dc004e', // Customize secondary color
    },
    background: {
      default: '#F2F8FF', // Background color for the app
    },
  },
});

// HIkfremfer


function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude || "N/A",
            lng: position.coords.longitude || "N/A",
          });
        },
        (error) => {
          console.error("Error accessing location:", error);
          setLocation(null); // Set to null if there's an error
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocation(null);
    }
  }, []);

  
  return (
    <>
     <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Links location={location} />
      </ThemeProvider>
    </>
  )
}

export default App
