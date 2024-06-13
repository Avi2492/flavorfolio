// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../../../components/common/Logo";
import {
  RiLockPasswordLine,
  RiMailLine,
  RiMapPinUserLine,
  RiUser3Line,
} from "@remixicon/react";
import AuthSvg from "../../../components/svg/AuthSvg";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const navigate = useNavigate();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      try {
        const res = await fetch("/api/v1/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, fullName, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to create Account!");
        }

        if (data.error) throw new Error(data.error);

        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("SignUp Success!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
    navigate("/");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex flex-1 flex-col justify-center items-center">
        <form
          className="lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit}
        >
          <Logo />
          <h1 className="text-2xl font-extrabold text-white flex justify-center">
            Signup Today.
          </h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <RiMailLine size={24} />
            <input
              type="email"
              className="grow"
              placeholder="Enter your email"
              name="email"
              onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className="btn rounded-md bg-orange-500 hover:bg-orange-600 text-white text-xl">
            {isPending ? "Loading..." : "Sign up!"}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-white text-lg flex justify-center">
            Already have an account?
          </p>
          <Link to="/login">
            <p className="text-orange-500 flex justify-center hover:text-white">
              Sign In
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
