import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7678ed',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#87CEEB', // Sky blue for the entire page background
      paper: '#FFFFFF', // White for components like the Navbar
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#0D0D3B', // Darker midnight blue
      paper: '#1A1A3F', // Slightly different shade for components
    },
  },
});
