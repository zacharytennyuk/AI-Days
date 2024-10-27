import { Typography } from '@mui/material';
import {React, useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';

const InformationSection = () => {
    const handleSubmit = () => {
      console.log("Form submitted!");
    };

    const getContent = () => {
      return ["Hi", "My", "Name", "Is", "Max", "Hi", "My", "Name", "Is", "Max", "Hi", "My", "Name", "Is", "Max", "Hi", "My", "Name", "Is", "Max", "Hi", "My", "Name", "Is", "Max", "Hi", "My", "Name", "Is", "Max", "Hi", "My", "Name", "Is", "Max", "Hi", "My", "Name", "Is", "Max", "Hi", "My", "Name", "Is", "Max", "Hi", "My", "Name", "Is", "Max", "Hi", "My", "Name", "Is", "Max", "Hi", "My", "Name", "Is", "Max"]
    }
  
    const [content, setContent] = useState([])


  
    useEffect(() => {
      setContent(getContent())
    }, [])
  
    return (
      <Box
        sx={{
          height: "calc(100vh - 64px)", 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          padding: 2,
        }}
      >
        <Box>
        <Typography sx={{marginTop: "40px"}} variant="h4" align="center" gutterBottom>
        Disaster Prepareness
        </Typography>
  
        </Box>
        <Box>
        </Box>
        <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mb: 2,
                marginTop: '8px',
                padding: 2, // Internal padding
                border: 1, // Thin border
                borderColor: 'primary.main', // Primary color for the border
                borderRadius: 1, // Slightly rounded corners
                height: "auto", // Set a fixed height (adjust as needed)
                overflowY: 'auto', // Enables vertical scrolling
                marginBottom: 'auto'
              }}
>
  {content.map((text, index) => (
    <Typography 
      sx={{
        padding: "0px",
        marginBlock: "4px",
      }}
      key={index}
    >
      {text}
    </Typography>
  ))}
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
            marginTop: "32px"
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
  )
}

export default InformationSection