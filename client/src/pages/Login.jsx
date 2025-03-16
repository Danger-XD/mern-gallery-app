import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { handleError, handleSuccess } from "../utilities/toasts";
import userStore from "../stores/user.store";
import { Toaster } from "react-hot-toast";
import { setCookies } from "../utilities/cookies.js";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { loginInfoRequest, loginResponse } = userStore();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      handleError("Required fields are empty!");
      return;
    }
    try {
      await loginInfoRequest(loginInfo);
      const updatedResponse = userStore.getState().loginResponse;
      const { success, message, name, token } = updatedResponse;
      if (success) {
        setCookies("token", token);
        const msg = message + " : " + name;
        handleSuccess(msg);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        className="bg-white w-72 h-70 py-32 bg-shadow rounded-3xl flex flex-col items-center justify-center md:w-82 md:h-72 lg:w-96 lg:h-76"
        onSubmit={handleSubmit}
      >
        <div className="font-bold text-3xl lg:text-4xl mb-4">PicPost</div>
        <div>
          <input
            className="pl-6 py-2.5 mb-5 w-60 md:w-70 lg:w-80 bg-gray-100 rounded"
            type="email"
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            className="pl-6 py-2.5 mb-5 w-60 md:w-70 lg:w-80 bg-gray-100 rounded"
            type="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <input className="py-1.5 mb-3 w-60 cursor-pointer text-xl md:w-70 lg:w-80 bg-gray-300 rounded" type="submit" value="Login" />
          <span>
            Create an Account?
            <Link to="/signup" className="ml-1 font-bold">Sign Up</Link>
          </span>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Login;
