import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import './order.css'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'


const Order =({url}) => {

  const [orders, setOrders]= useState([])

const fetchAllorders = async ()=> {
  const response= await axios.get(url+"/api/order/list");

  if (response.data.success) {
    setOrders(response.data.data)
  }

  else{
    toast.error("Error");
  }
 
}

//update order status
const statusHandler=async (event, orderId)=>{
   const response= await axios.post(url+"/api/order/status",{
     orderId, 
     status:event.target.value
   })

   if(response.data.success){
    await fetchAllorders();
   }
}


useEffect(()=>{
fetchAllorders();
}, [])

  return (
    <div className='order add'>
    <h3>Order Page</h3>
    <div className='order-list'>{orders.map((order, index)=>{
      return(
      <div key={index} className='order-item'>
      <img src={assets.parcel_icon}/>
      <div>
        <p className='order-item-foods'>
          {order.items.map((item, index)=>{
            if (index===order.items.length-1){
              {/* get last item */}
             return(
              item.name + " x " + item.quantity
             )
            }
            else{
              {/* grt other items to add coma*/}
              return(
              item.name + " x " + item.quantity+","
             )
            }

          })}
        </p>
        <p className="order-item-name">
          {order.address.firstName+ " "+ order.address.lastName}
        </p>
        <div className="order-item-address">
          <p>{order.address.
            street+","}</p>
            <p>{order.address.
              city+","+ order.address.
              state+","+order.address.
              country+","+order.address.
              zipcode}</p>
        </div>
       <p className='order-item-phone'>{order.address.phone}</p>
      </div>
      <p>Items: {order.items.length}</p>
      <p>${order.amount}</p>
      <select onChange={(event)=>statusHandler(event, order._id)} value={order.status}>
       <option value="food processing">food processing</option>
       <option value="out for delivery">Out for delivery</option>
       <option value="Delivered">Delivered</option>
      </select>
      </div>
    )
    })}</div>
    </div>
    
  )
}

export default Order