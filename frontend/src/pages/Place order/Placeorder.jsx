import React, { useContext, useEffect, useState } from "react";
import "./Placeorder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useFetcher, useNavigate } from "react-router-dom";

const Placeorder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  //onchange handler function to store data in data state
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };


  // redirect user to payment gatway

  const placeOrder=async (event)=>{
  event.preventDefault();

  let orderItems=[];
food_list.map((item)=>{
  if(cartItems[item._id]>0){
 let itemInfo=item;
 itemInfo["quantity"]=cartItems[item._id];

 orderItems.push(itemInfo);

  }
})

let orderData={
  //address store the our state[ data] info
  address: data,
  items:orderItems,
  amount:getTotalCartAmount()+2,
}

//send orderdata to our api
let response= await axios.post(url+"/api/order/place",orderData, {headers:{token}})
if(response.data.success){
  const {session_url}=response.data;
  //send user to session_url
  window.location.replace(session_url);
}
else{
  alert("Error");
}

  }

const navigate=useNavigate();

  useEffect(()=>{
  //  if user not authnticate
if(!token){
  navigate("/cart")
}
//if cart is empty
else if (getTotalCartAmount()===0){
  navigate("/cart")
}

  }, [token])
 
  return (
    <div>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="muti-fields">
            <input
              type="text"
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              placeholder="First name" 
              required 
            />

            <input
              type="text"
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              placeholder="Last name" 
              required
            />
          </div>

          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Email address" required
          />
          <input
            type="text"
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            placeholder="street" 
            required
          />
          <div className="muti-fields">
            <input
              type="text"
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              placeholder="City"
              required
            />
            <input
              type="text"
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              placeholder="state"
              required
            />
          </div>

          <div className="muti-fields">
            <input
              type="text"
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              placeholder="Zip code"
              required
            />

            <input
              type="text"
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              placeholder="country"
              required
            />
          </div>
          <input
            type="text"
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            placeholder="Phone"
            required
          />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />

              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>
            <button type="submit" >PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Placeorder;
