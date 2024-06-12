import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import WishlistPage from "./pages/WishlistPage";
import CreateRecipe from "./pages/CreateRecipe";
import Profile from "./pages/Profile";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";
import LoginPage from "./pages/auth/login/LoginPage";

const App = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/v1/auth/me");

        const data = await res.json();

        if (data.error) return null;

        if (!res.ok || data.error) {
          throw new Error("Oops! something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  return (
    <>
      <div className="flex max-w-6xl mx-auto">
        {authUser && <Sidebar />}
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/wishlist"
            element={authUser ? <WishlistPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/create"
            element={authUser ? <CreateRecipe /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/user-profile/:username"
            element={authUser ? <Profile /> : <Navigate to={"/login"} />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
};

export default App;
