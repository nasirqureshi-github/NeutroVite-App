import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext= createContext(null)

const StoreContextProvider= (props)=>{
   
  const [cartItems, setCartItems]= useState({});
  const [food_list, setFoodlist]=useState([]);

  //call backend
  const url = "http://localhost:4000"
    
  const [token, setToken]= useState ("")

  //add first item 
  const addTocart= async (itemId)=>{
      if(!cartItems[itemId]){
        setCartItems(pre=>({...pre, [itemId]:1}))
      }
      //if product alrady avilable with quantity 1
      else{
         setCartItems((pre)=>({...pre ,[itemId]: pre[itemId]+1}))
      }
   
      //save item to database
      if(token) {
       await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
      }
    }
   
 
      const getTotalCartAmount= ()=>{
        let totalAmount=0;
         for(const item in cartItems)
         {
          if(cartItems[item]>0){
            let itemInfo=food_list.find((product)=>product._id===item);
            // totalAmount+=itemInfo.price*cartItems[item];

            // Check if itemInfo exists  . new code added
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      } else {
        console.warn(`Product with ID ${item} not found in food_list.`);
      }

          }
           
         }
        return totalAmount;
      } 


      //fetch food from the database to show on front-end

      const fetchFoodlist=async ()=>{
        const response= await axios.get(url+"/api/food/list")
        setFoodlist(response.data.data)
      }

      const loadcartData = async (token)=>{
      const response= await axios.post(url+"/api/cart/get",{},{headers:{token}})
      setCartItems(response.data.cartData);
      } 


     //store token to the local storage
      useEffect(()=>{
       
        async function loadData() {
        await fetchFoodlist()
        if(localStorage.getItem("token")){
          setToken(localStorage.getItem("token"));
          //loadcart data when page refresh
          await loadcartData(localStorage.getItem("token"))
          
        }
       
      }

        loadData();
      },[])


    const removeFromcart= async(itemId)=>{
     setCartItems((pre)=>({...pre ,[itemId]:pre[itemId]-1}))
    
     if(token){
       await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
     }
    }

    const contextValue={
    food_list ,
    cartItems,
    setCartItems,
    addTocart,
    removeFromcart ,
    getTotalCartAmount,
    url,
    token,
    setToken
}

return(
  <StoreContext.Provider value={contextValue}>
   {props.children}
  </StoreContext.Provider>
)

}
export default StoreContextProvider;