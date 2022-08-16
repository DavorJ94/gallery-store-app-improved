import { Navigate, Route, Routes } from "react-router-dom";

import Cart from "./pages/Cart/Cart";
import Favorites from "./pages/Favorites/Favorites";
import HomePage from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;
