import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import AuthCheck from "./utilities/authCheck";
import Profile from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";
import AboutUsPage from "./pages/AboutUsPage";
import AppNav from "./components/Layouts/AppNav"

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
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/profile/:id"
          element={<PrivateRouting element={<Profile />}  />}
        />
        {/* The "*" wildcard route matches all undefined paths */}
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Routes>
    </>
  );
};

export default App;
