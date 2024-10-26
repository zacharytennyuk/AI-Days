import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import DownImage from './../assets/down.png';
import Earthquake from './../assets/earthquake.png';
import Tornado from './../assets/tornado.png';
import Hurricane from './../assets/hurricane.png';
import Wildfire from './../assets/fire.png';
import Flood from './../assets/flood.png';
import { motion } from 'framer-motion';

const SelectonSection = () => {
    const disasters = [
        { name: "Earthquake", image: Earthquake },
        { name: "Flood", image: Flood },
        { name: "Hurricane", image: Hurricane },
        { name: "Tornado", image: Tornado },
        { name: "Wildfire", image: Wildfire }
    ];

    const handleScroll = () => {
        window.scrollBy({
          top: window.innerHeight,
          behavior: 'smooth',
        });
    };

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100vh)',
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 1 }}
                viewport={{ once: false }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h3">Select Disaster</Typography>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'calc(40vh - 64px)',
                        marginBlock: '64px'
                    }}
                >
                    {/* First row with 3 buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        {disasters.slice(0, 3).map((disaster, index) => (
                            <Button
                                key={index}
                                sx={{
                                    borderRadius: '10%',
                                    minWidth: '150px !important',
                                    minHeight: '100px !important',
                                    padding: '0 !important',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingBottom: '16px !important',
                                    paddingTop: '32px !important',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                }}
                                variant="contained"
                                onClick={handleScroll}
                            >
                                <img src={disaster.image} alt={`${disaster.name} icon`} style={{ width: 30, height: 30 }} />
                                <p>{disaster.name}</p>
                            </Button>
                        ))}
                    </Box>
                    
                    {/* Second row with 2 buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        {disasters.slice(3).map((disaster, index) => (
                            <Button
                                key={index + 3}
                                sx={{
                                    borderRadius: '10%',
                                    minWidth: '150px !important',
                                    minHeight: '100px !important',
                                    padding: '0 !important',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingBlock: '16px !important',
                                    paddingTop: '32px !important',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                }}
                                variant="contained"
                                onClick={handleScroll}
                            >
                                <img src={disaster.image} alt={`${disaster.name} icon`} style={{ width: 30, height: 30 }} />
                                <p>{disaster.name}</p>
                            </Button>
                        ))}
                    </Box>
                </Box>
            </motion.div>
        </Box>
    );
};

export default SelectonSection;
