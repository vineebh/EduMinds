import React from "react";

const Loader = ({ size = "16", color = "from-blue-300 to-blue-600" }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div
        className={`relative w-${size} h-${size} border-4 border-transparent rounded-full animate-spin shadow-lg`}
      >
        <div
          className={`absolute inset-0 w-full h-full rounded-full bg-gradient-to-r ${color}`}
        ></div>
        <div
          className="absolute inset-0 w-full h-full rounded-full blur-md bg-gradient-to-r from-blue-300 to-blue-500 opacity-50"
        ></div>
      </div>
    </div>
  );
};

export default Loader;
