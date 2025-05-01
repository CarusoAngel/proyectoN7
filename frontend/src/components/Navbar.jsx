import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import CarritoDropdown from "./CarritoDropdown";

export default function Navbar({ cantidadEnCarrito, carrito, eliminarDelCarrito, vaciarCarrito }) {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const carritoRef = useRef(null);

  // Cerrar al hacer clic fuera del dropdown
  useEffect(() => {
    const handleClickFuera = (event) => {
      if (carritoRef.current && !carritoRef.current.contains(event.target)) {
        setMostrarCarrito(false);
      }
    };
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  return (
    <nav className="fixed w-full top-0 left-0 z-20 bg-transparent backdrop-blur-sm text-white py-4 px-8 flex justify-between items-center">
      {/* Links */}
      <div className="flex gap-10 font-semibold">
        <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
        <Link to="/productos" className="hover:text-yellow-400 transition-colors">Productos</Link>
        <Link to="/login" className="hover:text-yellow-400 transition-colors">Login</Link>
        <Link to="/registro" className="hover:text-yellow-400 transition-colors">Registro</Link>
      </div>

      {/* Ícono de carrito */}
      <div className="relative" ref={carritoRef}>
        <FiShoppingCart
          size={28}
          className="hover:text-yellow-400 cursor-pointer"
          onClick={() => setMostrarCarrito(!mostrarCarrito)}
        />
        {cantidadEnCarrito > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full px-2">
            {cantidadEnCarrito}
          </span>
        )}
        {mostrarCarrito && (
          <CarritoDropdown
            carrito={carrito}
            eliminarDelCarrito={eliminarDelCarrito}
            vaciarCarrito={vaciarCarrito}
          />
        )}
      </div>
    </nav>
  );
}