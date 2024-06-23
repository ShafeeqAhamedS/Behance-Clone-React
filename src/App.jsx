import { useState } from 'react'
import './App.css'
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import GalleryComponent from './components/GalleryComponent/GalleryComponent'
import TestComponent from './components/TestComponent/TestComponent'
import TestGalleryComponent from './components/TestComponent/TestGalleryComponent'
import IndexDB from './components/TestComponent/IndexDB'
import LocalTestGalleryComponent from './components/TestComponent/LocalTestGalleryComponent'

function App() {
  return (
    <div className="grid grid-cols-1">
      {/* <HeaderComponent/> */}
      {/* <GalleryComponent/> */}
      <TestComponent/>
      {/* <TestGalleryComponent/> */}
      <LocalTestGalleryComponent/>
      {/* <IndexDB/> */}
    </div>
  )
}

export default App
