import { Routes, Route } from 'react-router-dom';

import React from 'react'
import Home from '../pages/Home';
import Maps from '../pages/Maps';
const Links = (props) => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<Maps location={props.location}/>} />
    </Routes>
  )
}

export default Links