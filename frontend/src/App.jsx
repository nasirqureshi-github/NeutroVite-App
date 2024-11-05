import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/Place order/Placeorder'
import { Footer } from './components/footer/Footer'
import Login from './components/loginPopup/Login'
import { Verify } from './pages/verify/Verify'
import Myorder from './pages/Myorders/Myorder'


export const App = () => {

  const [showLogin, setShowlogin]=useState(false)
  return (
    <>
    {showLogin?<Login setShowlogin={setShowlogin}/> :<></>}
    <div className='app'>
    <Navbar setShowlogin={setShowlogin}/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/order' element={<Placeorder/>}/>
 
  <Route path='/verify' element={<Verify/>}/>

  <Route path='/myorders' element={<Myorder/>}/>

      </Routes>
      </div>

   <Footer/>
</>
  )
}
export default App;
