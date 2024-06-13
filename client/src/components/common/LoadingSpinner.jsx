import React from "react";
// import Typewriter from "typewriter-effect";

const LoadingSpinner = ({ size = "md" }) => {
  const sizeClass = `loading-${size}`;
  return (
    <>
      {/* <div className="text-orange-500 text-2xl text-bold">
        <Typewriter
          options={{
            strings: ["Sorry, 😥 We are not available at this time!"],
            autoStart: true,
            loop: true,
          }}
        />
      </div> */}
      <span className={`loading loading-dots ${sizeClass}`}></span>
    </>
  );
};

export default LoadingSpinner;
