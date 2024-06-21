import { RiArrowLeftLine } from "@remixicon/react";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
  });

  const {
    data: user,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/v1/users/profile/${username}`);

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something Went Wrong!");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  // const isMyProfile = authUser._id === user?._id;

  useEffect(() => {
    refetch();
  }, [username, refetch]);
  return (
    <div className="flex-1  p-10 min-h-screen">
      <div className="max-w-screen-lg mx-auto">
        <p className="font-bold text-xl md:text-4xl my-4">{user?.fullName}</p>
        <div className="p-10 flex-1 justify-center items-center">
          <div className="text-center">
            <p className="font-bold text-3xl text-gray-400">{user?.username}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              {user?.fullName}
            </h1>
            <p className="mt-4 text-base leading-7 text-gray-300">
              {user?.fullName}
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
