import React, { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, IconButton } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Navbar from "./components/Navbar";
import Links from "./routes/Links";
import React from 'react';
import { LoadScript } from "@react-google-maps/api";
import { LocationThemeProvider, LocationThemeContext } from "./context";

import "./App.css";

function App() {
  const [mode, setMode] = useState("light");
  const [location, setLocation] = useState({ lat: 0, lng: 0 }); // Initialize with default coordinates
  
  // Retrieve saved theme from local storage on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setMode(savedTheme);
    document.body.classList.add(
      savedTheme === "light" ? "light-mode" : "dark-mode"
    );
  }, []);

  const handleToggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);

    // Update body classes for the new theme
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(
      newMode === "light" ? "light-mode" : "dark-mode"
    );

    // Add animation classes to body for visual effects
    document.body.classList.add(newMode === "light" ? "sunrise" : "moonrise");
    setTimeout(() => {
      document.body.classList.remove("sunrise", "moonrise");
    }, 1000); // Match duration with CSS animation
  };

  // UseEffect for geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error accessing location:", error);
          setLocation(null); // Reset location on error
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      
        <Navbar />
        <IconButton
          onClick={handleToggleTheme}
          color="inherit"
          sx={{ position: "absolute", top: 11, right: 11 }}
        >
          {mode === "light" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      
        {/* Pass the location to Links */}
        <Links location={location} />
      </ThemeProvider>
    </LoadScript>
  );
}

export default App;
