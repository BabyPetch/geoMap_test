import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Map from './pages/map'
import Welcome from './pages/welcome'

function App() {
  return (
      <Router basename="/geoMap_test">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </Router>
  )
}

export default App
