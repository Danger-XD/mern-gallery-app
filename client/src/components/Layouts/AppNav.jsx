import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteCookies, getAuthCookies } from "../../utilities/cookies";
import userStore from "../../stores/user.store";
import { FaGripLines } from "react-icons/fa6";

const AppNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { userInfo, userInfoRequest, setUserInfo } = userStore.getState();
  const authId = getAuthCookies();
  const userId = userInfo?._id;

  useEffect(() => {
    if (authId) {
      (async () => {
        await userInfoRequest(authId);
      })();
    }
  }, [authId, userInfoRequest, isAuthenticated]);

  useEffect(() => {
    setIsAuthenticated(authId === userId);
  }, [authId, userId]);

  const handleLogout = (e) => {
    e.preventDefault();
    deleteCookies("token");
    setIsAuthenticated(false);
    setUserInfo(null);
    window.location.href = "/home";
    // navigate("/home");
  };

  const navItems = [
    { name: "Gallery", path: "/home" },
    ...(isAuthenticated
      ? [{ name: "Profile", path: `/profile/${userId}` }]
      : []),
    { name: "About us", path: "/about-us" },
  ];

  return (
    <nav className="flex justify-between items-center w-full px-9 py-7">
      <div className="logo text-3xl font-extrabold">
        <Link to="/home">PicPost</Link>
      </div>
      <ul className="space-x-6 w-fit hidden sm:flex">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`uppercase rounded-lg transition duration-300 ${
                location.pathname === item.path
                  ? "font-bold text-black"
                  : "font-bold text-gray-400 hover:text-black"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {isAuthenticated ? (
        <div className="">
          <div className="inline-block sm:hidden">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1">
                <FaGripLines className="border-none bg-none" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`uppercase rounded-lg transition duration-300 ${
                        location.pathname === item.path
                          ? "font-bold text-black"
                          : "font-bold text-gray-400 hover:text-black"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="hidden sm:block">
            <button
              className="p-2 rounded bg-gray-300 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center">
            <div className="inline-block sm:hidden dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1">
                <FaGripLines className="border-none bg-none" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`uppercase rounded-lg transition duration-300 ${
                        location.pathname === item.path
                          ? "font-bold text-black"
                          : "font-bold text-gray-400 hover:text-black"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <button onClick={() => navigate("/login")}>Login</button>
                </li>
                <li>
                  <button onClick={() => navigate("/signup")}>Sign Up</button>
                </li>
              </ul>
            </div>
            <div className="hidden sm:flex">
              <button
                className="rounded p-3 bg-gray-400 text-white cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="rounded ml-3 p-3 bg-gray-400 text-white cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AppNav;
