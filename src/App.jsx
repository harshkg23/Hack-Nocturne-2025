import { useState } from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Landing from './pages/Landing/Landing'

import UserLogin from "./pages/Login"
import Signup from "./pages/Signup"

function App() {

  return (
    <>
      <Header/>
      <Landing/>
      <Footer/>
       <Signup/>
    </>
  )
}

export default App
