import React from "react";
import {
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import Quake from "./../assets/quake.png";
import { motion } from "framer-motion";

const NeedsForm = () => {
  return (
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
      <Box
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "50%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 500 }} variant="h4">
            Earthquake
          </Typography>
          <Box
            component="img"
            src={Quake}
            sx={{
              width: "60%",
              borderRadius: "5%",
              marginBottom: "16px", // Adds spacing below the image
            }}
          />
          <TextField
            label="Enter Information"
            variant="outlined"
            sx={{ width: "80%", marginBottom: "16px" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "80%",
            }}
          >
            <FormControlLabel control={<Checkbox />} label="Food/Water" />
            <FormControlLabel control={<Checkbox />} label="Injury" />
            <FormControlLabel control={<Checkbox />} label="Shelter" />
          </Box>
        </Box>
        <Box sx={{ height: "100%", width: "50%", textAlign: "center" }}>
          <Typography variant="h4" sx={{ marginBlock: "240px" }}>
            Additional Options?
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NeedsForm;
