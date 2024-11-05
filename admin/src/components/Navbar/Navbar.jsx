import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='Navbar'>
   <img className='logo' src={assets.logo} alt="logo" />
   <h1 className='nav-heding'>NutroVite Admin Panel</h1>
   <img className='profile' src={assets.profile_image} alt="img" />
   </div>
  )
}

export default Navbar