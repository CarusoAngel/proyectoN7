import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Checkout = ({ carrito, eliminarDelCarrito, vaciarCarrito }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [modoInvitado, setModoInvitado] = useState(false);
  const [mostrarOpcionesInvitado, setMostrarOpcionesInvitado] = useState(false);

  useEffect(() => {
    if (!user) {
      setMostrarOpcionesInvitado(true);
    }
  }, [user]);

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const manejarConfirmacion = async () => {
    if (!nombre.trim() || !direccion.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (!carrito || carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const payload = {
      nombre,
      direccion,
      productos: carrito.map((item) => ({
        productoId: item._id,
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio: item.precio,
      })),
      total: calcularTotal(),
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const token = localStorage.getItem("token");
    if (user && token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const ordenResponse = await fetch(`${BASE_URL}/api/v1/order`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const ordenData = await ordenResponse.json();

      if (!ordenResponse.ok) {
        throw new Error(ordenData.message || "Error al crear la orden");
      }

      const itemsMP = carrito.map((item) => ({
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio: item.precio,
      }));

      const mpResponse = await fetch(`${BASE_URL}/api/checkout/create-preference`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: itemsMP }),
      });

      const mpData = await mpResponse.json();

      if (mpData.init_point) {
        vaciarCarrito();
        window.location.href = mpData.init_point;
      } else {
        throw new Error("No se pudo generar el link de pago");
      }
    } catch (error) {
      console.error("Error al procesar:", error);
      alert("No se pudo completar la orden ni el pago. Intenta nuevamente.");
    }
  };

  if (!user && mostrarOpcionesInvitado && !modoInvitado) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white p-6">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center space-y-6 max-w-lg">
          <h2 className="text-2xl font-bold">¿Cómo deseas continuar?</h2>
          <p className="text-gray-300">Puedes iniciar sesión para guardar tu historial o continuar como invitado.</p>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 rounded-xl"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setModoInvitado(true)}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-xl"
            >
              Continuar como invitado
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-start text-white bg-gradient-to-b from-black to-gray-900">
      <h1 className="text-3xl font-bold mb-6">Resumen del Carrito</h1>

      {carrito.length === 0 ? (
        <p className="text-lg text-gray-300">Tu carrito está vacío.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-4">
          {carrito.map((item) => (
            <div
              key={item._id || item.nombre}
              className="bg-white/10 backdrop-blur-md p-4 rounded-xl flex justify-between items-center shadow-md"
            >
              <div>
                <h2 className="text-xl font-semibold">{item.nombre}</h2>
                <p>Cantidad: {item.cantidad}</p>
                <p>Precio: ${item.precio.toLocaleString("es-CL")}</p>
              </div>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={() => eliminarDelCarrito(item._id)}
              >
                Eliminar
              </button>
            </div>
          ))}

          <div className="mt-6 text-right text-2xl font-bold">
            Total: ${calcularTotal().toLocaleString("es-CL")}
          </div>

          <div className="mt-8 bg-white/10 backdrop-blur-md p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-semibold">Datos para la Orden</h2>
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-3 rounded bg-black/60 text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Dirección de envío"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full p-3 rounded bg-black/60 text-white placeholder-gray-400"
            />

            <button
              onClick={manejarConfirmacion}
              className="w-full py-3 bg-green-600 rounded-xl text-white font-semibold hover:bg-green-700 transition"
            >
              Confirmar y pagar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;