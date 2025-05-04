import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import CarritoDropdown from "./CarritoDropdown";

export default function Navbar({ cantidadEnCarrito, carrito, eliminarDelCarrito, vaciarCarrito }) {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState(null);
  const carritoRef = useRef(null);
  const navigate = useNavigate();

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickFuera = (event) => {
      if (carritoRef.current && !carritoRef.current.contains(event.target)) {
        setMostrarCarrito(false);
      }
    };
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  // Escuchar cambios en localStorage (incluido cambio manual con dispatchEvent)
  useEffect(() => {
    const actualizarNombre = () => {
      const nombre = localStorage.getItem("nombre");
      setNombreUsuario(nombre);
    };

    actualizarNombre(); // en primera carga
    window.addEventListener("storage", actualizarNombre); // por si cambia desde otra pestaña

    return () => window.removeEventListener("storage", actualizarNombre);
  }, []);

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    setNombreUsuario(null); // asegurarse de limpiar estado
    navigate("/login");
  };

  return (
    <nav className="fixed w-full top-0 left-0 z-20 bg-transparent backdrop-blur-sm text-white py-4 px-8 flex justify-between items-center">
      {/* Links de navegación */}
      <div className="flex gap-10 font-semibold items-center">
        <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
        <Link to="/productos" className="hover:text-yellow-400 transition-colors">Productos</Link>
        {!nombreUsuario ? (
          <>
            <Link to="/login" className="hover:text-yellow-400 transition-colors">Login</Link>
            <Link to="/registro" className="hover:text-yellow-400 transition-colors">Registro</Link>
          </>
        ) : (
          <>
            <Link to="/perfil" className="hover:text-yellow-400 transition-colors">
              Perfil de {nombreUsuario}
            </Link>
            <button
              onClick={cerrarSesion}
              className="ml-2 hover:text-red-400 transition-colors"
            >
              Cerrar sesión
            </button>
          </>
        )}
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
