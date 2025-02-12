import { create } from "zustand";
import axios from "axios";
import { handleError } from "../utilities/toasts";

const userStore = create((set) => ({
  signupResponse: {},
  signupInfoRequest: async (userInfo) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/signup",
        userInfo
      );
      set({ signupResponse: response.data });
    } catch (error) {
      handleError(error.response?.data?.message);
    }
  },
  loginResponse: {},
  loginInfoRequest: async (userInfo) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        userInfo
      );
      set({ loginResponse: response.data });
    } catch (error) {
      handleError(error.response?.data?.message);
    }
  },
}));

export default userStore;
