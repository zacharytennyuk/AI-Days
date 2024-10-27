import { Typography, TextField, IconButton, Box } from '@mui/material';
import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import Maps from '../pages/Maps';
import { MedicalInformationSharp, Search } from "@mui/icons-material";
import { motion } from "framer-motion";
import { LocationThemeContext } from '../LocationThemeContext'; // Import the context
import NeedButton from "./NeedButton";
import { useLocation } from 'react-router-dom';

const InformationSection = () => {
    const { location } = useContext(LocationThemeContext); // Access location from context
    const { state } = useLocation();
    const answers = state || {}; 




    if (!location) {
        console.warn("Location is not available.");
        return null; // Or handle this gracefully
    }

    useEffect(() => {
        console.log(state)
    }, [state])

    const [content, setContent] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const [notes, setNotes] = useState({
        isFood: true,
        isInjured: false,
        isShelter: true,
        information: "I need help.",
        disaster: "natural disaster"
    });
    const [textVisible, setTextVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = e.target.elements.textInput.value;
        
        if (text.startsWith("!map")) {
            const query = text.slice(4).trim(); // Extract search query after "!map"
            if (!query) {
                console.warn("No query provided after !map.");
                return;
            }
            console.log("map query");
            try {
                const response = await axios.post("http://localhost:8000/api/search-place", {
                    query: query,
                    location: [location.lat, location.lng],
                    radius: 5000,
                });

                const places = response.data.places || []; // Extract places
                setSearchResults(places); // Set the search results

                updateContent("user", `Searching for places: ${query}`);
                if (places.length > 0) {
                    updateContent("bot", "Mapping locations!");
                } else {
                    updateContent("bot", "No locations found.");
                }

            } catch (error) {
                console.error("Error fetching search results:", error);
                updateContent("bot", "Oops! Failed to retrieve locations. I'm here to help! Please type in a specific resource or place you need!");
            }
        } else {
            // Standard message handling if not a !map command
            updateContent("user", text);
            e.target.elements.textInput.value = ""; // Clear the input field
            let information = content.map(item => (typeof item === 'string' ? item : item.paragraph))
            information.push(text)
            information = information.join(' ')


            const notesData = {
                foodWater: notes.isFood,
                injury: notes.isInjured,
                shelter: notes.isShelter,
                information: information,
                disaster: notes.disaster,
                notes: information,
                location: location,
            };

            try {
                console.log(notesData)
                const response = await axios.post("http://localhost:8000/api/send_notes", notesData);
                console.log("Data sent successfully:", response.data);

                if (response.data) {
                    updateContent("bot", response.data.answer.answer || "Bot response");
                }
            } catch (error) {
                console.error("Error sending data:", error);
            }
        }
    };

    const getContent = () => {
        return [
          { user: "bot", paragraph: answers.answer.answer},
        ];
    };

    // Update content by appending a new object
    const updateContent = (user, text) => {
        const newEntry = { user, paragraph: text };
        setContent(prevContent => [...prevContent, newEntry]);
    };

    useEffect(() => {
        setContent(getContent());
    }, []);

    const handleAnimationComplete = () => {
        setTextVisible(true); // Reveal text after the main box transition
    };

    const renderMessageBox = (user, message, index) => (
        <motion.div
            key={index}
            initial={{ x: user === "bot" ? "-100%" : "100%", opacity: 0 }} // Start from left for bot, right for user
            animate={{ x: 0, opacity: textVisible ? 1 : 0 }} // Slide in as it fades in
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            style={{ display: 'flex', justifyContent: user === "bot" ? "flex-start" : "flex-end" }}
        >
            <Box
                sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    backgroundColor: user === "bot" ? "#e0f7fa" : "#cfe8fc",
                    color: "#333",
                    padding: "8px 8px",
                    borderRadius: "16px",
                    maxWidth: "80%",
                    marginBlock: "8px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    alignSelf: user === "bot" ? "flex-start" : "flex-end",
                }}
            >
                <Typography variant="body2" sx={{ wordWrap: "break-word", mr: 1 }}>
                    {message}
                </Typography>
                {user === "bot" && (message.includes("Food") || message.includes("injured") || message.includes("shelter")) && (
                    <IconButton color="primary" aria-label="find" sx={{ marginLeft: "auto" }}>
                        <Search />
                    </IconButton>
                )}
            </Box>
        </motion.div>
    );

    return (
        <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', flexDirection: 'row-reverse' }}>
            {/* Map section, taking 80% of the viewport width */}
            <Box sx={{ flex: 0.8 }}>
                <Maps location={location} searchResults={searchResults}/>
            </Box>

            {/* Content section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                onAnimationComplete={handleAnimationComplete}
                style={{ flex: 0.4, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', marginLeft: "16px" }}
            >
                

                <Box
                    sx={{
                        padding: 2,
                        paddingRight: "0px !important",
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        height: '100%',
                        marginBottom: '0px',
                        marginLeft: '8px'
                    }}
                >              
                    
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            mb: 2,
                            mt: 2,
                            p: 2,
                            border: 1,
                            borderColor: 'primary.main',
                            borderRadius: 1,
                            height: "100%",
                            marginBottom: 'auto',
                        }}
                    >
                        <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>

                        {/* Need Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <NeedButton queryType="foodWater" label="Food & Water" location={location} setSearchResults={setSearchResults} />
                            <NeedButton queryType="injury" label="Medical Assistance" location={location} setSearchResults={setSearchResults} />
                            <NeedButton queryType="shelter" label="Shelter" location={location} setSearchResults={setSearchResults} />
                        </Box>
                    </Box>
                      <Box sx={{
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        mb: 2,
                        pb: 8,
                        height: "100%",
                        marginBottom: 'auto',
                      }}>

                        {content.map((item, index) => renderMessageBox(item.user, item.paragraph, index))}
                        </Box>
                          <motion.div
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: textVisible ? 1 : 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          >
                          <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                alignItems: 'space-between',
                                gap: 2,
                                width: '100%',
                                justifyContent: 'space-between',
                                mb: 2,
                                mt: "auto",
                            }}
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                name="textInput"
                                label="Enter your text"
                                variant="standard"
                                fullWidth
                                sx={{ maxWidth: '100%' }}
                            />
                            <IconButton color="primary" type="submit" size="large" sx={{ padding: "0px" }}>
                                <SendIcon />
                            </IconButton>
                        </Box>
                        </motion.div>
                    </Box>
                </Box>
            </motion.div>
        </Box>
    );
};

export default InformationSection;