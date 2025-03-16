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
  userInfo: {},
  setUserInfo:{},
  userImages: [],
  userInfoRequest: async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/images/profile-all/${userId}`,
        { withCredentials: true }
      );
      set({
        userInfo: response.data.userInfo,
        userImages: response.data.data,
      });
    } catch (error) {
      handleError(error.response?.data?.message);
    }
  },
}));

export default userStore;
