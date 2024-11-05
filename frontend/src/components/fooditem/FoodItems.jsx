import React, { useContext} from 'react'
import './fooditem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'

const FoodItems = ({id,name, price, description, image}) => {

  const {cartItems ,addTocart, removeFromcart,url}= useContext(StoreContext);
  
  return (
    <div className='food-item'>
       <div className="food-item-img-container">
        {/* <img className='food-item-img' src={url+"/images/"+image} alt='img'/> */}
        <img className='food-item-img' src={image} alt='img'/>
        { 
          !cartItems[id]?<img className='add' onClick={()=>addTocart(id)} src={assets.add_icon_white}/>:<div className='food-item-counter'><img onClick={()=>removeFromcart(id)} src={assets.remove_icon_red} alt=''/> <p>{cartItems[id]}</p>
          <img onClick={()=> addTocart(id)} src={assets.add_icon_green}/>
          
          </div>
        }
       </div>

       <div className="food-item-info">
        <div className="food-item-name-rating">
           <p>{name}</p>
           <img src={assets.rating_starts}/> 
</div>
     <p className='food-item-description'>{description}</p>
     <p className="food-item-price">${price}</p>
       </div>
    
    </div>
  )
}

export default FoodItems