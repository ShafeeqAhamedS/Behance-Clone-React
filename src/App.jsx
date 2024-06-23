import { useState } from 'react'
import './App.css'
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import GalleryComponent from './components/GalleryComponent/GalleryComponent'

function App() {
  return (
    <div className="grid grid-cols-1">
      <HeaderComponent/>
      <GalleryComponent/>
    </div>
  )
}

export default App
