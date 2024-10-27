import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LocationThemeProvider } from './context.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
     <LocationThemeProvider>
        <App />
        </LocationThemeProvider>
     </BrowserRouter>
  
  </StrictMode>,
)
