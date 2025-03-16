import React from "react";
import { ColorRing } from "react-loader-spinner";
const Spinner = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={["#504B38", "#B9B28A", "#EBE5C2", "#393E46", "#222831"]}
    />
    </div>
  );
};

export default Spinner;
