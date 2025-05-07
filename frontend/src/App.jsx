import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Perfil from "../pages/Perfil";
import Productos from "../pages/Productos";
import Checkout from "../pages/Checkout";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default Router;
