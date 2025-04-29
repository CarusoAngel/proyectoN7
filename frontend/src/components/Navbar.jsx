import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 left-0 z-20 bg-transparent backdrop-blur-sm text-white py-4 px-8 flex justify-center gap-10 font-semibold">
      <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
      <Link to="/productos" className="hover:text-yellow-400 transition-colors">Productos</Link>
      <Link to="/login" className="hover:text-yellow-400 transition-colors">Login</Link>
      <Link to="/registro" className="hover:text-yellow-400 transition-colors">Registro</Link>
    </nav>
  );
}