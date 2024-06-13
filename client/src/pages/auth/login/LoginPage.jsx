import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Logo from "../../../components/common/Logo";
import { RiLockPasswordLine, RiMapPinUserLine } from "@remixicon/react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetch("/api/v1/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to Login");
      } catch (error) {
        toast.error(error.message);
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("LogIn Success!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex max-w-screen-xl mx-auto h-screen">
      <div className="flex-1 flex flex-col justify-center items-center">
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <Logo />
          <h1 className="text-2xl font-extrabold text-white flex justify-center">
            {"Let's"} Login.
          </h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <RiMapPinUserLine size={24} />
            <input
              type="text"
              className="grow"
              placeholder="Enter Your Username!"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </label>
          <label className="input input-bordered rounded flex items-center gap-2">
            <RiLockPasswordLine size={24} />
            <input
              type="password"
              className="grow"
              placeholder="Enter Your Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className="btn rounded-md bg-orange-500 text-white text-xl hover:bg-orange-600">
            {isPending ? "Loading..." : "Login"}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-white text-lg">{"Don't"} have an account?</p>
          <Link to="/">
            <p className="text-orange-500 flex justify-center hover:text-white">
              Sign up
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
