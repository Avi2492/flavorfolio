import { RiArrowLeftLine } from "@remixicon/react";
import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="flex-1  p-10 min-h-screen">
      <div className="max-w-screen-lg mx-auto">
        <p className="font-bold text-xl md:text-4xl my-4">Hello, Username</p>
        <div className="p-10 flex-1 justify-center items-center">
          <div className="text-center">
            <p className="font-bold text-3xl text-gray-400">404</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-4 text-base leading-7 text-gray-300">
              Sorry, we couldn&apos:t find the page you&apos;re looking for.
            </p>
            <div className="mt-4 flex items-center justify-center gap-x-1">
              <Link to={"/"}>
                <button type="button" className="btn btn-outline">
                  <RiArrowLeftLine size={20} />
                  Go back
                </button>
              </Link>
              <button className="btn btn-info text-white">
                <span className="loading loading-spinner"></span>
                Will Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
