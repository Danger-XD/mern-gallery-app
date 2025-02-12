import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import AuthCheck from "./utilities/authCheck";

const App = () => {
  //private routing
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRouting = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <AuthCheck setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRouting element={<Home />} />} />
      </Routes>
    </>
  );
};

export default App;
