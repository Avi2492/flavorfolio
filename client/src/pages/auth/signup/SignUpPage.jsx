import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../../../components/Logo";
import {
  RiLockPasswordLine,
  RiMailLine,
  RiMapPinUserLine,
  RiUser3Line,
} from "@remixicon/react";
import AuthSvg from "../../../components/svg/AuthSvg";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const navigate = useNavigate();
  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <AuthSvg />
      </div>
      <div className="flex flex-1 flex-col justify-center items-center">
        <form className="lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col">
          <Logo className="w-24 lg:hidden" />
          <h1 className="text-4xl font-extrabold text-neutral-content">
            Signup Today.
          </h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <RiMailLine size={24} />
            <input
              type="email"
              className="grow"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
            />
          </label>
          <div className="flex gap-4 flex-wrap">
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <RiUser3Line size={24} />
              <input
                type="text"
                className="grow"
                placeholder="Enter your username"
                name="username"
                value={formData.username}
              />
            </label>
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <RiMapPinUserLine size={24} />
              <input
                type="text"
                className="grow"
                placeholder="Enter your fullname"
                name="fullName"
                value={formData.fullName}
              />
            </label>
          </div>
          <label className="input input-bordered rounded flex items-center gap-2">
            <RiLockPasswordLine size={24} />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              value={formData.password}
            />
          </label>
          <button className="btn rounded-md bg-orange-500 hover:bg-orange-600 text-white">
            Sign up!
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
