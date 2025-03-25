import React from "react";
import Loader from "./Loader";
import ReactDOM from "react-dom";

const LoaderOverlay = () => {
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 z-[999]">
      <Loader />
    </div>,
    document.body
  );
};

export default LoaderOverlay;
