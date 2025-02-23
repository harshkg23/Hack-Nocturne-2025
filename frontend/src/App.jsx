import { useState } from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Landing from './pages/Landing/Landing'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './layout/Layout/Layout';
import Signup from './pages/Signup';
import UserLogin from './pages/Login';


function App() {

  return (
  
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} /> {/* Renders at "/" */}
          <Route path="login" element={<UserLogin />} />
          <Route path="signup" element={<Signup />} />
          
        </Route>
      </Routes>
   
  );
}

export default App
