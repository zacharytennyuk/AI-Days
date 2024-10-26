import { Routes, Route } from 'react-router-dom';

import React from 'react'
import Home from '../pages/Home/Home';

const Links = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default Links