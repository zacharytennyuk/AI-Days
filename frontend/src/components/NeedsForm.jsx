import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Earthquake from "./../assets/quake.png";
import Flood from "./../assets/flood.png";
import Hurricane from "./../assets/hurricane.png";
import Tornado from "./../assets/tornado.png";
import Wildfire from "./../assets/fire.png";

const NeedsForm = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { disaster } = location.state || {};


  useEffect(() => {
    if (!disaster) {
      navigate('/');
    }
  }, [disaster, navigate]);


  const disasterImages = {
    Earthquake: Earthquake,
    Flood: Flood,
    Hurricane: Hurricane,
    Tornado: Tornado,
    Wildfire: Wildfire,
  };


  const [formData, setFormData] = useState({
    information: "",
    foodWater: false,
    injury: false,
    shelter: false,
    disaster: disaster,
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      information: event.target.value,
    });
  };

  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);

  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
            {formData.disaster}
          </Typography>
          <Box
            component="img"
            src={disasterImages[formData.disaster]}
            sx={{
              width: "60%",
              borderRadius: "5%",
              marginBottom: "16px",
            }}
          />
          <TextField
            label="Enter Information"
            variant="outlined"
            sx={{ width: "80%", marginBottom: "16px" }}
            value={formData.information}
            onChange={handleInputChange}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "80%",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.foodWater}
                  onChange={handleCheckboxChange}
                  name="foodWater"
                />
              }
              label="Food/Water"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.injury}
                  onChange={handleCheckboxChange}
                  name="injury"
                />
              }
              label="Injury"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.shelter}
                  onChange={handleCheckboxChange}
                  name="shelter"
                />
              }
              label="Shelter"
            />
          </Box>
          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: "16px" }}
          >
            Submit
          </Button>
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
