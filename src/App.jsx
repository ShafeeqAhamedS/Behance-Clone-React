import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import GalleryComponent from './components/GalleryComponent/GalleryComponent'
import LoginComponent from './components/HeaderComponent/LoginComponent'
import SignupComponent from './components/HeaderComponent/SignupComponent';

function App() {
  return (
    <div className="grid grid-cols-1">
      <Router>
        <Routes>
            <Route path="/" element={
            <>
              <HeaderComponent />
              <GalleryComponent />
            </>
            } />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
