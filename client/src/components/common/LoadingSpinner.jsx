import React from "react";

const LoadingSpinner = ({ size = "md" }) => {
  const sizeClass = `loading-${size}`;
  return (
    <>
      <div>
        <h2 className=" text-4xl">Sorry we are not available at this time</h2>
      </div>
      <span className={`loading loading-dots ${sizeClass}`}></span>
    </>
  );
};

export default LoadingSpinner;
