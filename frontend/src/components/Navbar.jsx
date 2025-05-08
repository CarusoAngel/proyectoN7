import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import CarritoDropdown from "./CarritoDropdown";
import { useUser } from "../context/UserContext";

export default function Navbar({ cantidadEnCarrito, carrito, eliminarDelCarrito, vaciarCarrito }) {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const carritoRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useUser();

  useEffect(() => {
    const handleClickFuera = (event) => {
      if (carritoRef.current && !carritoRef.current.contains(event.target)) {
        setMostrarCarrito(false);
      }
    };
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-black/60 backdrop-blur-md text-white py-4 px-8 shadow-md border-b border-white/10">
      <div className="flex justify-between items-center">
        {/* Enlaces de navegación */}
        <div className="flex gap-6 md:gap-8 font-medium text-base">
          <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
          <Link to="/productos" className="hover:text-yellow-400 transition-colors">Productos</Link>

          {user && user.rol === "admin" && (
            <Link to="/admin-ordenes" className="hover:text-yellow-400 transition-colors">
              Admin Órdenes
            </Link>
          )}

          {user ? (
            <>
              <Link to="/perfil" className="hover:text-yellow-400 transition-colors">
                {user.nombre || "Perfil"}
              </Link>
              <button
                onClick={cerrarSesion}
                className="hover:text-red-400 transition-colors cursor-pointer"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-400 transition-colors">Login</Link>
              <Link to="/registro" className="hover:text-yellow-400 transition-colors">Registro</Link>
            </>
          )}
        </div>

        {/* Ícono del carrito */}
        <div className="relative" ref={carritoRef}>
          <FiShoppingCart
            size={26}
            className="cursor-pointer hover:text-yellow-400 transition-transform hover:scale-110"
            onClick={() => setMostrarCarrito(!mostrarCarrito)}
          />
          {cantidadEnCarrito > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full px-2 shadow">
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
      </div>
    </nav>
  );
}