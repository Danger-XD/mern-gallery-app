import React from "react";
import AppNav from "./AppNav";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <AppNav />
        {props.children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
