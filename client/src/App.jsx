import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import WishlistPage from "./pages/WishlistPage";
import CreateRecipe from "./pages/CreateRecipe";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/user-profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
