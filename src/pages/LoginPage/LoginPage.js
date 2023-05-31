import React from "react";
import LoginPageComponent from "../components/LoginPageComponent";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../../redux/actions/userAction.js";
import axios from "axios";
import Cookies from "js-cookie";


const loginUserApiRequest = async (email, password, doNotLogout) => {
  const { data } = await axios.post('/api/users/login', {
    email,
    password,
    doNotLogout,
  });
  if (data.userLoggedIn.doNotLogout)
    localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
    
  else sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn));
  return data;
};

function LoginPage() {
  const reduxDispatch = useDispatch();

  return (
    <LoginPageComponent
      loginUserApiRequest={loginUserApiRequest}
      reduxDispatch={reduxDispatch}
      setReduxUserState={setReduxUserState}
    />
  );
}

export default LoginPage;
