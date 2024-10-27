import { Routes, Route } from "react-router-dom";

import React from "react";
import Home from "../pages/Home";
import Maps from "../pages/Maps";
import Needs from "../pages/Needs/Needs";
import InformationService from "../pages/InformationService";
import About from "../pages/About.jsx";

const Links = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/maps" element={<Maps location={props.location}/>} />
      <Route path="/needs" element={<Needs />} />
      <Route path="/start" element={<InformationService />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default Links;
