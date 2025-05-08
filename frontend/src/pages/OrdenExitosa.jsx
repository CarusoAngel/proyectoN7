import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OrdenExitosa = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");

    if (status !== "approved") {
      // Si no viene con status aprobado, redirige al home
      navigate("/");
    }
  }, [location.search, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[url('/background-stellare.webp')] bg-cover bg-center backdrop-blur-md p-6">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl max-w-xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-green-400">✅ Pago Exitoso</h1>
        <p className="text-gray-200 text-lg">
          ¡Gracias por tu compra! Tu orden ha sido registrada correctamente. Pronto recibirás un correo con la confirmación.
        </p>
        <Link
          to="/productos"
          className="inline-block bg-yellow-400 text-black font-semibold py-3 px-6 rounded-xl hover:bg-yellow-300 transition"
        >
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
};

export default OrdenExitosa;