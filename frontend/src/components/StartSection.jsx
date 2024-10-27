import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import DownImage from "./../assets/down.png"; // Import the image
import { motion } from "framer-motion";
import Globe from "../components/Globe";

const StartSection = () => {
  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 2 }}
          viewport={{ once: false }}
          style={{
            height: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Globe/>
          <Typography variant="h3" sx={{ }}>
            Tailored Survival Kit Solutions
          </Typography>
          <motion.div
      animate={{
        y: [0, -5, 0], // Moves up and then back down
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity, // Repeats the animation indefinitely
      }}
    >
      <Button
        sx={{
          borderRadius: "50%",
          minWidth: "48px !important",
          minHeight: "48px !important",
          padding: "0 !important",
          marginTop: "48px"
        }}
        variant="contained"
        onClick={handleScroll}
      >
        <img
          src={DownImage}
          alt="button icon"
          style={{ width: 12, height: 12 }}
        />
      </Button>
    </motion.div>
        </motion.div>
      </Box>
    </>
  );
};

export default StartSection;
