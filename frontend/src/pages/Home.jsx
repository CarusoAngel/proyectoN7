import { Link } from "react-router-dom";
import backgroundImage from "../assets/background-stellare.webp";

export default function Home() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center z-[-1]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Capa oscura encima */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0"></div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-4 max-w-2xl bg-black/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl">
          Stellare Industries
        </h1>
        <p className="text-xl md:text-2xl text-white font-medium mb-4 drop-shadow-lg">
          Transformamos superficies. Elevamos estándares.
        </p>
        <p className="text-base md:text-lg text-gray-300 mb-6">
          Powder Coating, Cerakote, Fibra de Carbono y Sandblasting.
        </p>
        <Link to="/productos">
          <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200">
            Ver Productos
          </button>
        </Link>
      </div>
    </section>
  );
}
