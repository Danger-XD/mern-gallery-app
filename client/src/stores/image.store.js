import { create } from "zustand";
import { handleError, handleSuccess } from "../utilities/toasts";
import axios from "axios";

const imageStore = create((set) => ({
  homeImages: [],
  homeImageRequest: async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/images/all-posts"
      );
      set({ homeImages: response.data.data });
    } catch (error) {
      handleError(error.response?.data?.message);
    }
  },
  profilePostCreateRequest: async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/images/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      handleSuccess(response.data.success);
    } catch (error) {
      handleError(error.response?.data?.message);
    }
  },
  deletePostRequest: async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/images/delete-post/${postId}`,
        { withCredentials: true }
      );
    } catch (error) {
      handleError(error.response?.data?.message);
    }
  },
  updatePostRequest: async (caption, visible, postId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/images/update/${postId}`,
        {caption,
        visible},
        {
          withCredentials: true,
        }
      );
      handleSuccess(response.data.success);
      await get().homeImageRequest();
    } catch (error) {
      handleError(error.response?.data?.message);
    }
  },
}));
export default imageStore;
