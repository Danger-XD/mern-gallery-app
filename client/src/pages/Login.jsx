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
      handleError("All fields are required");
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
    <div>
      <form className="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
            placeholder="xyz@xyx.com"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div>
          <input type="submit" value="Login" />
          <span>
            Create an Account?
            <Link to="/signup">Sign Up</Link>
          </span>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Login;
