import React, { useContext, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const Login = ({ setShowlogin }) => {
  const [currState, setCurrstate] = useState("Login");

  const { url, setToken } = useContext(StoreContext);

  //create state variables to store user details
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //function take data from the input and save it to the state variable (data)

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  //function for user login
  //link this function to the form

  const OnLogin = async (event) => {
    event.preventDefault();
    //url condition
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    //call api
    //login and register use post method so we will use post with axios
    //if the state is login axios will call login api other wise it will call register api

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      //create token
      setToken(response.data.token);

      //save token to localstorage
      localStorage.setItem("token", response.data.token);

      //if the user login then hide login page

      setShowlogin(false);
    } else {
      //when user not login to the system
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={OnLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowlogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              placeholder="your name"
              required
            />
          )}

          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="your email"
            required
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="login-popup-condtion">
          <input type="checkbox" required />
          <p>By continuing, i agree to the term of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrstate("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrstate("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
