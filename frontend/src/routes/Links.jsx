import { Routes, Route } from 'react-router-dom';

import React from 'react'
import Home from '../pages/Home';
import Maps from '../pages/Maps';
import InformationService from '../pages/InformationService'
import About from '../pages/About.jsx'

const Links = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/start" element={<InformationService />} />
        <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default Links