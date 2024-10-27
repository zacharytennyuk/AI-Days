import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Earthquake from "./../assets/earthquake.png";
import Tornado from "./../assets/tornado.png";
import Hurricane from "./../assets/hurricane.png";
import Wildfire from "./../assets/fire.png";
import Flood from "./../assets/flood.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SelectonSection = () => {
  const disasters = [
    { name: "Earthquake", image: Earthquake },
    { name: "Flood", image: Flood },
    { name: "Hurricane", image: Hurricane },
    { name: "Tornado", image: Tornado },
    { name: "Wildfire", image: Wildfire },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Select Disaster</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
            height: "calc(40vh - 64px)",
            marginBlock: "64px",
          }}
        >
          {/* First row with 3 buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            {disasters.slice(0, 3).map((disaster, index) => (
              <Link
                key={index}
                to="/needs"
                state={{ disaster: disaster.name }}
                style={{ textDecoration: "none" }}
              >
                <Button
                  sx={{
                    borderRadius: "10%",
                    minWidth: "150px !important",
                    minHeight: "100px !important",
                    padding: "0 !important",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    borderWidth: "2px",
                  }}
                  variant="outlined"
                >
                  <img
                    src={disaster.image}
                    alt={`${disaster.name} icon`}
                    style={{ width: 30, height: 30 }}
                  />
                  <Typography
                    sx={{ marginTop: "8px", color: "black" }}
                    variant="body1"
                  >
                    {disaster.name}
                  </Typography>
                </Button>
              </Link>
            ))}
          </Box>

          {/* Second row with 2 buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            {disasters.slice(3).map((disaster, index) => (
              <Link
                key={index + 3}
                to="/needs"
                state={{ disaster: disaster.name }}
                style={{ textDecoration: "none" }}
              >
                <Button
                  sx={{
                    borderRadius: "10%",
                    minWidth: "150px !important",
                    minHeight: "100px !important",
                    padding: "0 !important",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    borderWidth: "2px",
                  }}
                  variant="outlined"
                >
                  <img
                    src={disaster.image}
                    alt={`${disaster.name} icon`}
                    style={{ width: 30, height: 30 }}
                  />
                  <Typography
                    sx={{ marginTop: "8px", color: "black" }}
                    variant="body1"
                  >
                    {disaster.name}
                  </Typography>
                </Button>
              </Link>
            ))}
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default SelectonSection;
