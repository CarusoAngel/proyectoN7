import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Checkout = ({ carrito, eliminarDelCarrito, vaciarCarrito }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const manejarConfirmacion = async () => {
    if (!nombre.trim() || !direccion.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Debes iniciar sesión para confirmar la compra.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre,
          direccion,
          productos: carrito.map((item) => ({
            productoId: item._id,
            nombre: item.nombre,
            cantidad: item.cantidad,
            precio: item.precio,
          })),
          total: calcularTotal(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear la orden");
      }

      alert("Orden confirmada con éxito");
      vaciarCarrito();
      navigate("/orden-exitosa");
    } catch (error) {
      console.error("Error al enviar orden:", error);
      alert("No se pudo confirmar la orden. Intenta nuevamente.");
    }
  };

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

          {/* FORMULARIO DE ORDEN */}
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