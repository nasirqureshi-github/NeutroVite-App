import React, { useEffect, useState } from 'react'
import axios from 'axios'
import  './List.css'
import { toast } from 'react-toastify';

const List = ({url}) => {
    //to list the data, store the data in state
    const [list, setList]=useState([]);
    
    const fetchList=async ()=>{
     const response = await axios.get(`${url}/api/food/list`)
  if (response.data.success) {
    setList(response.data.data)
  } 
  else {
    toast.error("Error");
  }
    }

   useEffect(()=>{
    fetchList();
   },[])
   
   
   //remove item from list
   const removeFood=async(foodId)=>{
   //api call
const response=await axios.post(`${url}/api/food/remove`,{id:foodId})

//fetch upadted data from api call
await fetchList();
if(response.data.success)
{
    toast.success(response.data.message);
}
else{
    toast.error("Error");
}
    }
   

  return (
    <div className='list add flex-col'>
    <p className='list-heading'>All Nutrients List</p>
    <div className="list-table">
        <div className="list-table-format title">
         <b>Image</b>
         <b>Name</b>
         <b>Category</b>
         <b>Price</b>
         <b>Action</b>
        </div>

        {list.map((item, index)=>{
        return(
            <div key={index} className='list-table-format'>
            {/* <img src={`${url}/images/`+ item.image} alt='product-image'/>  */}
            <img src={item.image} alt='food-image' /> 
            <p>{item.name}</p>
            <p>{item.category}
            </p>
            <p>{item.price}</p>
            <p className='cursor' onClick={()=>removeFood(item._id)}>X</p>
            
            </div>
        )
        })}
    </div>
    </div>
  )
}

export default List