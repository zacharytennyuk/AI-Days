import { Routes, Route } from "react-router-dom";
import { LoadScript } from '@react-google-maps/api';
import React from "react";
import Home from "../pages/Home";
import Maps from "../pages/Maps";
import Needs from "../pages/Needs/Needs";
import InformationService from "../pages/InformationService";
import About from "../pages/About.jsx";

const Links = (props) => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<Maps location={props.location}/>} />
        <Route path="/needs" element={<Needs />} />
        <Route path="/start" element={<InformationService />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </LoadScript>
  );
};

export default Links;
