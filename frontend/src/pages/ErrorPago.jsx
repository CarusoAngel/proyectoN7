import { useLocation, Link } from "react-router-dom";

const ErrorPago = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const status = params.get("status");

  let mensaje = "Ocurrió un problema con el pago.";

  if (status === "failed") {
    mensaje = "El pago fue rechazado o cancelado.";
  } else if (status === "pending") {
    mensaje = "Tu pago está pendiente. Te notificaremos cuando se confirme.";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white p-6">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center max-w-xl w-full space-y-6">
        <h1 className="text-4xl font-bold text-red-500">Error en el Pago</h1>
        <p className="text-lg text-gray-300">{mensaje}</p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/checkout"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Reintentar pago
          </Link>
          <Link
            to="/productos"
            className="px-6 py-3 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-300 transition"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPago;