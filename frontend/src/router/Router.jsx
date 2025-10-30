import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "../shared/components/Nav";
import Home from "../features/home/Home";
import Cart from "../features/cart/Cart";
import User from "../features/user/User";
import Info from "../features/user/pages/Info";

function AppRouter() {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/user" element={<User />}>
          <Route path="info" element={<Info />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<h2>404 — Página no encontrada</h2>} />
      </Routes>

      <Footer />

      {/* modal universal de login/register */}
      <AuthModal />
    </BrowserRouter>
  );
}

export default AppRouter;