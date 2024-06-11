import React from "react";
import {
  RiHeart2Line,
  RiHeartAdd2Line,
  RiHome2Line,
  RiUser3Line,
} from "@remixicon/react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Sidebar = () => {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;

const DesktopSidebar = () => {
  return (
    <>
      <div className="p-3 md:p-10 border-r min-h-screen w-24 md:w-64 hidden sm:block">
        <div className="flex flex-col gap-20 sticky top-10 left-0">
          <div className="w-full">
            <Logo />
          </div>
          <ul className="flex flex-col items-center md:items-start gap-8">
            <Link to={"/"} className="flex gap-1 items-center">
              <RiHome2Line size={30} />
              <span className="font-bold hidden md:block">Home</span>
            </Link>
            <Link to={"/wishlist"} className="flex gap-1 items-center">
              <RiHeart2Line size={30} />
              <span className="font-bold hidden md:block">My Favorites</span>
            </Link>
            <Link to={"/create"} className="flex gap-1 items-center">
              <RiHeartAdd2Line size={30} />
              <span className="font-bold hidden md:block">Create New</span>
            </Link>
          </ul>
          <div className=" mt-32">
            <Link to={"/signup"} className="flex gap-1 items-center">
              <RiUser3Line size={30} />
              <span className="font-bold hidden md:block">My Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const MobileSidebar = () => {
  return (
    <div
      className="flex justify-between gap-10 border-t fixed w-full
			bottom-0 left-0 bg-base-100 z-10 p-2 sm:hidden 
		"
    >
      <Link to={"/"}>
        <RiHome2Line size={24} className="cursor-pointer" />
      </Link>
      <Link to={"/wishlist"}>
        <RiHeart2Line size={24} className="cursor-pointer" />
      </Link>
      <Link to={"/create"} className="flex gap-1 items-center">
        <RiHeartAdd2Line size={24} />
      </Link>
      <Link to={"/signup"} className="flex gap-1 items-center">
        <RiUser3Line size={24} />
      </Link>
    </div>
  );
};
