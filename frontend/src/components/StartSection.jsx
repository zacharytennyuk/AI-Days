import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import DownImage from "./../assets/down.png"; // Import the image
import { motion } from "framer-motion";

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
          <Typography variant="h3" sx={{ marginBlock: "240px" }}>
            Tailored Survival Kit Solutions
          </Typography>
          <Button
            sx={{
              borderRadius: "50%",
              minWidth: "48px !important",
              minHeight: "48px !important",
              padding: "0 !important",
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
      </Box>
    </>
  );
};

export default StartSection;
