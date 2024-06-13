import React from "react";

const LoadingSpinner = ({ size = "md" }) => {
  const sizeClass = `loading-${size}`;
  return (
    <>
      <span className={`loading loading-dots ${sizeClass}`}></span>
    </>
  );
};

export default LoadingSpinner;
