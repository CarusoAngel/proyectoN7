import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 flex justify-center gap-8 text-white">
      <Link to="/" className="hover:text-yellow-400">Home</Link>
      <Link to="/productos" className="hover:text-yellow-400">Productos</Link>
      <Link to="/login" className="hover:text-yellow-400">Login</Link>
      <Link to="/registro" className="hover:text-yellow-400">Registro</Link>
    </nav>
  );
}
