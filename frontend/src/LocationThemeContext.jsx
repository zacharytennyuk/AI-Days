// LocationThemeContext.js
import React, { createContext, useState, useEffect } from "react";

export const LocationThemeContext = createContext();

export const LocationThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const [location, setLocation] = useState({ lat: 0, lng: 0 }); // Default coordinates

  // Load theme from local storage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setMode(savedTheme);
    document.body.classList.add(savedTheme === "light" ? "light-mode" : "dark-mode");
  }, []);

  const handleToggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(newMode === "light" ? "light-mode" : "dark-mode");

    document.body.classList.add(newMode === "light" ? "sunrise" : "moonrise");
    setTimeout(() => {
      document.body.classList.remove("sunrise", "moonrise");
    }, 1000); // Match CSS animation duration
  };

  // Geolocation effect
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

  return (
    <LocationThemeContext.Provider value={{ mode, location, handleToggleTheme }}>
      {children}
    </LocationThemeContext.Provider>
  );
};
