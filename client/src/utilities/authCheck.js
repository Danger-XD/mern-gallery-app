import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { getCookies } from "./cookies";

const AuthCheck = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (getCookies("token")) {
      setIsAuthenticated(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname == "/signup"
      ) {
        navigate("/home", { replace: false });
      }
    }
  }, [location, navigate, setIsAuthenticated]);
  return null;
};

export default AuthCheck;
