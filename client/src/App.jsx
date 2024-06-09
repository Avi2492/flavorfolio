import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import WishlistPage from "./pages/WishlistPage";

const App = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
