import { jwtDecode } from "jwt-decode";
import { handleError } from "./toasts";
import Cookies from "js-cookie";
export const setCookies = (name, value) => {
  try {
    if (!name || !value) {
      throw new Error("Invalid cookie");
    }
    const defaultOptions = { expires: 1 };
    Cookies.set(name, value, defaultOptions);
  } catch (error) {
    handleError(error.message);
  }
};
export const getCookies = (name) => {
  try {
    return Cookies.get(name);
  } catch (error) {
    handleError(error.message);
    return null;
  }
};
export const getAuthCookies = () => {
  try {
    const { id } = jwtDecode(Cookies.get("token"));
    return id;
  } catch (error) {
    handleError(error.message);
    return null;
  }
};
export const deleteCookies = (name) => {
  try {
    if (!name) {
      throw new Error("Cookie not found");
    }
    Cookies.remove(name);
  } catch (error) {
    handleError(error.message);
  }
};
