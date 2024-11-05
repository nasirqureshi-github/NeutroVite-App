import React, { useContext, useEffect, useState } from 'react'
import './myorder.css'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
const Myorder = () => {
    const {url, token}=useContext(StoreContext)
    const [data, setdata]=useState([]);

  const fetchorders= async ()=>{
    const response= await axios.post(url+"/api/order/userorders", {},{headers:{token}});
     setdata(response.data.data)
     console.log(response.data.data)
  }

  useEffect(()=>{
    if(token){
        fetchorders();
    }
    //if user login and then logout and login again we have to call this function agin, so we will pass token in dependency
  }, [token])

   
  return (
    <div className='my-orders'>
        <h>My Orders</h>
        <div className='container'>
           {data.map((order, index)=>{
          return(
            <div key={index}     
             className='my-orders-order'>
          <img src={assets.parcel_icon} />
          {/* last items of items arry */}
           <p>{order.items.map((item,index)=>{
             if(index== order.items.length-1){
                return item.name+" x "+ item.quantity
             }
             else{
                {/* show all items */}
                return item.name+" x "+ item.quantity+ ","
             }

           })}</p>

           <p>${order.amount}.00</p>

           <p>Items: {order.items.length}</p>

           <p><span>&#x25cf;</span><b>{order.status}</b> </p>
           <button onClick={fetchorders}>Track order</button>
            </div>
          )
           })} 
        </div>
    </div>
  )
}

export default Myorder