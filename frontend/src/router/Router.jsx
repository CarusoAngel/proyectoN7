import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Productos from "../pages/Productos";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Perfil from "../pages/Perfil";
import Checkout from "../pages/Checkout";
import OrdenExitosa from "../pages/OrdenExitosa";
import AdminOrdenes from "../pages/AdminOrdenes";

import { useCarrito } from "../context/CarritoContext";

export default function Router() {
  const ctx = useCarrito();

  if (!ctx) {
    console.error("useCarrito devolvió undefined. Asegúrate de envolver tu app con <CarritoProvider>.");
    return <div>Error: contexto del carrito no disponible</div>;
  }

  const { carrito, dispatch } = ctx;

  const agregarAlCarrito = (producto) => {
    dispatch({ type: "AGREGAR_PRODUCTO", payload: producto });
  };

  const eliminarDelCarrito = (id) => {
    dispatch({ type: "ELIMINAR_PRODUCTO", payload: id });
  };

  const vaciarCarrito = () => {
    dispatch({ type: "VACIAR_CARRITO" });
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
        <Route path="/productos" element={<Productos agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/orden-exitosa" element={<OrdenExitosa />} />
        <Route path="/admin/ordenes" element={<AdminOrdenes />} />
        <Route
          path="/checkout"
          element={
            <Checkout
              carrito={carrito}
              eliminarDelCarrito={eliminarDelCarrito}
              vaciarCarrito={vaciarCarrito}
            />
          }
        />
      </Routes>
    </>
  );
}
