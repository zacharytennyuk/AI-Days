import React from 'react';
import { ToggleButton } from '@mui/material';
import axios from 'axios';

const NeedButton = ({ queryType, label, location, setSearchResults }) => {
    // Map query types to specific search terms
    const queryMap = {
        foodWater: "places to get food and water, grocery stores, restaurants",
        injury: "medical assistance, hospitals, or health centers",
        shelter: "shelter and safe places",
    };

    // Handler for button click to perform search
    const handleSearch = async () => {
        if (!location) {
            console.warn("Location is not available for the search.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/search-place", {
                query: queryMap[queryType],
                location: [location.lat, location.lng],
                radius: 5000,
            });

            const places = response.data.places || [];
            setSearchResults(places);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <ToggleButton
            value={queryType}
            onClick={handleSearch} // Triggers search on click
            sx={{
                borderColor: "primary.main",
                backgroundColor: "transparent",
                color: "text.primary",
                textTransform: "capitalize",
                margin: "0 8px"
            }}
        >
            {label}
        </ToggleButton>
    );
};

export default NeedButton;
