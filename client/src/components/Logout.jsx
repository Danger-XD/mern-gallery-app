import React from "react";
import { deleteCookies } from "../utilities/cookies";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    deleteCookies("token");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
