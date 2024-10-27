import { Routes, Route } from 'react-router-dom';

import React from 'react'
import Home from '../pages/Home';
import Maps from '../pages/Maps';
const Links = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<Maps />} />
    </Routes>
  )
}

export default Links