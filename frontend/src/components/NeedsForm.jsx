import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Earthquake from "./../assets/quake.png";
import Flood from "./../assets/flood.png";
import Hurricane from "./../assets/hurricane.png";
import Tornado from "./../assets/tornado.png";
import Wildfire from "./../assets/fire.png";
import Close from "./../assets/close.png";

const NeedsForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { disaster } = location.state || {};

  useEffect(() => {
    if (!disaster) {
      navigate("/");
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

  const [additionalConcerns, setAdditionalConcerns] = useState([]);
  const [newConcern, setNewConcern] = useState("");

  const handleAddConcern = () => {
    if (newConcern.trim() !== "") {
      setAdditionalConcerns([...additionalConcerns, newConcern]);
      setNewConcern("");
    }
  };

  const handleRemoveConcern = (indexToRemove) => {
    setAdditionalConcerns((prevConcerns) =>
      prevConcerns.filter((_, index) => index !== indexToRemove)
    );
  };

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
          height: "92%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          boxShadow:
            "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);",
          borderRadius: "10px",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "50%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRight: "2px solid #9aa5b8",
            paddingTop: "1.5rem",
            paddingBottom: "2rem",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ fontWeight: 400, marginBottom: "1rem" }}
            variant="h4"
          >
            {formData.disaster}
          </Typography>
          <Box
            component="img"
            src={disasterImages[formData.disaster]}
            sx={{
              width: "60%",
              borderRadius: "5%",
              marginBottom: "16px",
              boxShadow:
                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            }}
          />
          <Box sx={{ width: "80%" }}>
            <TextField
              label="Enter Zip Code"
              variant="outlined"
              sx={{ width: "100%", marginBottom: "16px" }}
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
              <Typography
                sx={{ fontWeight: 400, marginBottom: "1rem" }}
                variant="p"
              >
                {"Anything Needed? Check all that apply"}
              </Typography>
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
                    checked={formData.shelter}
                    onChange={handleCheckboxChange}
                    name="shelter"
                  />
                }
                label="Shelter"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.injury}
                    onChange={handleCheckboxChange}
                    name="injury"
                  />
                }
                label="Help (Injured)"
              />
            </Box>
          </Box>

          <Button variant="contained" type="submit" sx={{ marginTop: "16px" }}>
            Submit
          </Button>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "50%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: "80%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "1.5rem",
            }}
          >
            <Typography variant="p" sx={{ fontSize: "1.5rem" }}>
              Additional Concerns?
            </Typography>
            <List
              sx={{
                width: "80%",
                overflow: "auto",
              }}
            >
              {additionalConcerns.map((concern, index) => (
                <ListItem
                  sx={{
                    boxShadow:
                      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    border: "1px solid #a7b3c7",
                    borderRadius: "10px",
                    marginTop: "1.5rem",
                  }}
                  key={index}
                >
                  <ListItemText primary={concern} />
                  <Box
                    component="img"
                    src={Close}
                    sx={{
                      height: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemoveConcern(index)}
                  ></Box>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box
            sx={{
              width: "80%",
              marginBottom: "32px",
            }}
          >
            <TextField
              label="Add a concern"
              variant="outlined"
              sx={{ width: "80%", marginTop: "16px", marginBottom: "16px" }}
              value={newConcern}
              onChange={(e) => setNewConcern(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleAddConcern}
              sx={{ marginTop: "8px" }}
            >
              Add Concern
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NeedsForm;
