// import React from "react";
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
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <AuthSvg />
      </div>
      <div className="flex flex-1 flex-col justify-center items-center">
        <form
          className="lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit}
        >
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
          <button className="btn rounded-md bg-orange-500 hover:bg-orange-600 text-white">
            {isPending ? "Loading..." : "Sign up!"}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-white text-lg">Already have an account?</p>
          <Link to="/login">
            <button className="btn rounded-full bg-orange-500 text-white btn-outline w-full">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
