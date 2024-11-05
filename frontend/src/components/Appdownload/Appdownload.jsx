import React from 'react'
import './Appdownload.css'
import { assets } from '../../assets/assets'
const Appdownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download <br/> Nutrovite App</p>
        <div className="app-download-platform">
            <img src={assets.play_store} alt="play-store" /><img src={assets.app_store} alt="apple-store" />
        </div>
    </div>
  )
}

export default Appdownload