import { Link } from "react-router-dom";
import backgroundImage from "../assets/background-stellare.webp";

export default function Home() {
  return (
    <section
      className="min-h-screen bg-cover bg-center relative flex items-start justify-center pt-32 pb-12"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* /* Contenido */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg">
          Stellare Industries
        </h1>
        <p className="text-lg md:text-2xl text-white mb-2 font-semibold drop-shadow-md">
          Transformamos superficies. Elevamos estándares.
        </p>
        <p className="text-base md:text-lg text-gray-300 mb-5 drop-shadow-md">
          Expertos en Powder Coating, Cerakote, Fibra de Carbono y Sandblasting.
        </p>
        <Link to="/productos">
          <button className="bg-white text-gray-800 font-bold py-2 px-6 rounded-full text-base hover:scale-105 transition-transform hover:bg-gray-200">
            Ver Productos
          </button>
        </Link>
      </div>
    </section>
  );
}
