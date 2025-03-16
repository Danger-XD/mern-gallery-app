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
      handleError("Required fields are empty!");
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
    <div className="w-full h-screen flex justify-center items-center">
      <form
        className="bg-white w-72 h-90 py-32 bg-shadow rounded-3xl flex flex-col items-center justify-center md:w-82 lg:w-96 lg:h-96"
        onSubmit={handleSubmit}
      >
        <div className="font-bold text-3xl lg:text-4xl mb-4">PicPost</div>
        <div>
          <input
            className="pl-6 py-2.5 mb-5 w-60 md:w-70 lg:w-80 bg-gray-100 rounded"
            type="text"
            name="name"
            value={signUpInfo.name}
            onChange={handleChange}
            placeholder="Full Name"
          />
        </div>
        <div>
          <input
            className="pl-6 py-2.5 mb-5 w-60 md:w-70 lg:w-80 bg-gray-100 rounded"
            type="email"
            name="email"
            value={signUpInfo.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            className="pl-6 py-2.5 mb-5 w-60 md:w-70 lg:w-80 bg-gray-100 rounded"
            type="password"
            name="password"
            value={signUpInfo.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <input
            className="py-1.5 mb-3 cursor-pointer w-60 text-xl md:w-70 lg:w-80 bg-gray-300 rounded"
            type="submit"
            value="Sign up"
          />
          <span>
            Already Have an Account?
            <Link to="/login" className="ml-1 font-bold">
              Login
            </Link>
          </span>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Signup;
