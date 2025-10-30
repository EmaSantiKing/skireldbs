import { Routes, Route } from "react-router-dom";
import Nav from "../shared/components/Nav";
import Home from "../features/home/Home";
import Cart from "../features/cart/Cart";
import User from "../features/user/User";
import Info from "../features/user/pages/Info";
import Footer from "../shared/components/Footer";
import Auth from "../features/auth/Auth"

function AppRouter() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<User />} />
<<<<<<< HEAD
        <Route path="/auth" element={<Auth />} />
=======
>>>>>>> 099424e5f4c2e59040fa18452934190db6fe5421
        <Route path="/user/info" element={<Info />} />
        <Route path="*" element={<h2>404 — Página no encontrada</h2>} />
      </Routes>

      <Footer />
    </>
  );
}

export default AppRouter;
