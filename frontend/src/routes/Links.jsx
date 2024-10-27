import { Routes, Route } from "react-router-dom";

import React from "react";
import Home from "../pages/Home/";
import Needs from "../pages/Needs/Needs";
import Maps from "../pages/Maps";
const Links = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/needs" element={<Needs />} />

      <Route path="/maps" element={<Maps />} />
    </Routes>
  );
};

export default Links;
