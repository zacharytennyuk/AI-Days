import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LocationThemeProvider } from './LocationThemeContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
     <LocationThemeProvider>
        <App />
        </LocationThemeProvider>
     </BrowserRouter>
  
  </StrictMode>,
)
