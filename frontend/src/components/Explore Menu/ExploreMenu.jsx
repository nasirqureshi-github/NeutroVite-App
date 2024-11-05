import React from 'react'
import './Exploremenue.css'
import {menu_list} from '../../assets/assets'

const ExploreMenu = ({category ,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
 <h1>Explore Our menu</h1>
 <p className='explore-menu-text'>Discover a delicious array of dishes crafted just for you! Order now and enjoy our fresh, flavorful meals delivered right to your door, making every dining experience exceptional.</p>

 <div className="explore-menu-list">
   { menu_list.map((item, index)=>{
    return(
        <div  onClick={()=>setCategory(pre=>pre===item.menu_name?"All":item.menu_name)} className='explore-menu-list-item' key={index}>

        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt='img'/>
        <p>{item.menu_name}</p>
        </div>
    )})}
 </div>
 <hr/>

    </div>
  )
}

export default ExploreMenu;