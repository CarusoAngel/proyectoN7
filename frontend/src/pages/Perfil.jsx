import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Perfil() {
  const { user, token, dispatch } = useUser();
  const navigate = useNavigate();
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
      return;
    }

    const fetchOrdenes = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/order/mis-ordenes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setOrdenes(data);
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchOrdenes();
  }, [token, user, navigate, BASE_URL]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 px-4 py-10 text-white">
      <div className="absolute inset-0 bg-[url('/src/assets/background-stellare.webp')] bg-cover bg-center opacity-20 z-0"></div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10 text-center mb-10">
          <h2 className="text-3xl font-extrabold mb-6">Mi Perfil</h2>

          {user ? (
            <>
              {user.imagen ? (
                <img
                  src={user.imagen}
                  alt="Foto de perfil"
                  className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-yellow-400 object-cover"
                />
              ) : (
                <div className="w-24 h-24 mx-auto rounded-full mb-4 bg-gray-700 border-4 border-yellow-400 flex items-center justify-center text-2xl font-bold">
                  {user.nombre?.charAt(0)}
                </div>
              )}

              <div className="mb-2">
                <p className="text-sm text-gray-400">Nombre:</p>
                <p className="text-lg font-semibold">{user.nombre}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-400">Correo electrónico:</p>
                <p className="text-lg font-semibold">{user.correo}</p>
              </div>

              <button
                onClick={handleLogout}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-6 rounded-xl transition-all duration-200"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <p className="text-white">Cargando datos del usuario...</p>
          )}
        </div>

        <div className="relative z-10 bg-black/50 backdrop-blur-md p-6 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold mb-4 text-yellow-400 text-center">
            Historial de Compras
          </h3>

          {cargando ? (
            <p className="text-gray-300 text-center">Cargando órdenes...</p>
          ) : ordenes.length === 0 ? (
            <p className="text-gray-300 text-center">Aún no has realizado ninguna orden.</p>
          ) : (
            <div className="space-y-6">
              {ordenes.map((orden) => (
                <div key={orden._id} className="bg-white/10 p-4 rounded-xl shadow-md">
                  <p className="text-sm text-gray-400 mb-2">
                    <strong>Fecha:</strong>{" "}
                    {new Date(orden.createdAt).toLocaleString("es-CL")}
                  </p>
                  <p><strong>Nombre:</strong> {orden.nombre}</p>
                  <p><strong>Dirección:</strong> {orden.direccion}</p>
                  <p className="mt-2 font-semibold">Productos:</p>
                  <ul className="list-disc ml-6 text-sm">
                    {orden.productos.map((prod, idx) => (
                      <li key={idx}>
                        {prod.nombre} x{prod.cantidad} — ${prod.precio.toLocaleString("es-CL")}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 font-bold text-yellow-400">
                    Total: ${orden.total.toLocaleString("es-CL")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}