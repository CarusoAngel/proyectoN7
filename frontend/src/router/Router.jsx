import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

import Home from "../pages/Home";
import Productos from "../pages/Productos";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Perfil from "../pages/Perfil";

export default function Router() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existente = prevCarrito.find((item) => item.id === producto.id);
      if (existente) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (indexAEliminar) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((_, index) => index !== indexAEliminar)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <>
      <Navbar
        carrito={carrito}
        cantidadEnCarrito={carrito.reduce((acc, item) => acc + item.cantidad, 0)}
        eliminarDelCarrito={eliminarDelCarrito}
        vaciarCarrito={vaciarCarrito}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/productos"
          element={<Productos agregarAlCarrito={agregarAlCarrito} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </>
  );
}
