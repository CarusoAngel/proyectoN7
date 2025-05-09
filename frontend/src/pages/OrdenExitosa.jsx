import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OrdenExitosa = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    const preference_id = params.get("preference_id");

    if (status !== "approved") {
      navigate("/");
      return;
    }

    const confirmarOrden = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/order/confirmar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ preference_id }),
        });

        const data = await response.json();
        if (response.ok) {
          setMensaje("Tu orden ha sido registrada con éxito.");
        } else {
          setMensaje(data.message || "Hubo un problema al registrar tu orden.");
        }
      } catch (error) {
        console.error("Error al confirmar orden:", error);
        setMensaje("Ocurrió un error al registrar tu orden.");
      }
    };

    confirmarOrden();
  }, [location.search, navigate, BASE_URL]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[url('/background-stellare.webp')] bg-cover bg-center backdrop-blur-md p-6">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl max-w-xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-green-400">✅ Pago Exitoso</h1>
        <p className="text-gray-200 text-lg">
          {mensaje || "Procesando tu orden..."}
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