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
import Flood from "./../assets/flood_big.avif";
import Hurricane from "./../assets/hurricane_big.jpg";
import Tornado from "./../assets/tornado_big.jpg";
import Wildfire from "./../assets/wildfire_big.jpg";
import Close from "./../assets/close.png";
import axios from "axios";

const NeedsForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { disaster } = location.state || {};

  const [concernsMade, setConcernsMade] = useState(false);

  const exampleConcerns = ["May need more meds", "Need way to stay warm"];

  const postNotes = async () => {
    console.log(additionalConcerns);
    try {
      const response = await axios.post("http://localhost:8000/send_notes", {
        ...formData,
        information: additionalConcerns.join(" "),
      });

      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  useEffect(() => {
    if (!disaster) {
      navigate("/");
    }

  const handleNavigation = async () => {
    setLoading(true);

    // Call your function here and wait for it to resolve
    let answers = await handleSubmit();

    setLoading(false);

    // Navigate with state after the function resolves
    navigate('/start', { state: { answers : answers } });
  };
  }, [disaster, navigate]);

  const disasterImages = {
    Earthquake: Earthquake,
    Flood: Flood,
    Hurricane: Hurricane,
    Tornado: Tornado,
    Wildfire: Wildfire,
  };

  const [formData, setFormData] = useState({
    foodWater: false,
    injury: false,
    shelter: false,
    information: "",
    disaster: disaster,
  });

  const [loading, setLoading] = useState(false);

  const [additionalConcerns, setAdditionalConcerns] = useState([]);
  const [newConcern, setNewConcern] = useState("");

  const handleAddConcern = () => {
    if (!concernsMade) {
      setConcernsMade(true);
    }
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
    setLoading(true);
    event.preventDefault();

    let notes = await postNotes();
    console.log("Form Data:", formData);
    return notes
  };

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 1000,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <div className="loader" style={{ marginBottom: "8rem" }}></div>
        </Box>
      )}
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
        <Typography
          sx={{
            fontFamily: "Anton",
            fontWeight: 500,
            marginBottom: "1rem",
            color: "#333",
          }}
          variant="h4"
        >
          {formData.disaster + " Preparation"}
        </Typography>
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
            width: "80%",
            height: "90%",
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
            <Box
              component="img"
              src={disasterImages[formData.disaster]}
              sx={{
                width: "75%",
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

            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: "16px" }}
            >
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
                {!concernsMade &&
                  exampleConcerns.map((concern, index) => (
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
                    </ListItem>
                  ))}
                {concernsMade &&
                  additionalConcerns.map((concern, index) => (
                    <ListItem
                      sx={{
                        boxShadow:
                          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                        border: "1px solid #a7b3c7",
                        borderRadius: "10px",
                        marginTop: "1.5rem",
                        overflowWrap: "normal",
                      }}
                      key={index}
                    >
                      <ListItemText
                        primary={concern}
                        sx={{ wordBreak: "break-word" }}
                      />
                      <Box
                        component="img"
                        src={Close}
                        sx={{
                          height: "1rem",
                          cursor: "pointer",
                          marginLeft: ".1rem",
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
    </>
  );
};

export default NeedsForm;
