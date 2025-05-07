import { Link } from "react-router-dom";

const OrdenExitosa = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-b from-black to-gray-900 p-6">
      <h1 className="text-4xl font-bold mb-4">Orden Confirmada</h1>
      <p className="text-lg mb-6 text-gray-300">
        Tu orden ha sido registrada exitosamente. Gracias por confiar en Stellare Industries.
      </p>
      <Link
        to="/productos"
        className="px-6 py-3 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-300 transition"
      >
        Volver a la tienda
      </Link>
    </div>
  );
};

export default OrdenExitosa;