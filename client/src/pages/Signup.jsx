import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import userStore from "../stores/user.store.js";
import { handleError, handleSuccess } from "../utilities/toasts";
import { Toaster } from "react-hot-toast";

const Signup = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { signupInfoRequest } = userStore();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo((state) => ({
      ...state,
      [name]: value,
    }));
    // const copySignUpInfo = { ...signUpInfo };
    // copySignUpInfo[name] = value;
    // setSignUpInfo(copySignUpInfo);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signUpInfo;
    if (!name || !email || !password) {
      handleError("All fields are required");
      return;
    }
    try {
      await signupInfoRequest(signUpInfo);
      const updatedResponse = userStore.getState().signupResponse;
      const { success, message } = updatedResponse;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={signUpInfo.name}
            onChange={handleChange}
            placeholder="Full Name"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={signUpInfo.email}
            onChange={handleChange}
            placeholder="xyz@xyx.com"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={signUpInfo.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div>
          <input type="submit" value="Signup" />
          <span>
            Already Have an Account?
            <Link to="/login">Login</Link>
          </span>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Signup;
