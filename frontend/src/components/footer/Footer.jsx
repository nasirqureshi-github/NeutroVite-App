import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
export const Footer = () => {
  return (
    <div className='footer' id='footer'>
      
      <div className="footer-content">

        <div className="footer-content-left">
           <img className="logo" src={assets.logo} alt='logo'/> 
           <p> Discover a delicious array of dishes crafted just for you! Order now and enjoy our fresh, flavorful meals delivered right to your door, making every dining experience exceptional.</p>
        
        <div className="footer-social-icons">
            <img src={assets.facebook_icon}  alt="facebook" />
            <img src={assets.twitter_icon}  alt="twitter" />
            <img src={assets.linkedin_icon}  alt="linkedin" />
        </div>
        </div>
       

        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-212-636-1987</li>
                <li>contact@nutrovite.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>
        copyright 2024 @ nutrovite.com. All Right Reserved.
      </p>
    </div>
  )
}
