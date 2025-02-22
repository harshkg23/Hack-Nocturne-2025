import { useState } from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Landing from './pages/Landing/Landing'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Landing/>
      <Footer/>
    </>
  )
}

export default App
