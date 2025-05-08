import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const AdminOrdenes = () => {
  const { user, token } = useUser();
  const navigate = useNavigate();
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!user || user.rol !== "admin") {
      navigate("/login");
      return;
    }

    const fetchOrdenes = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/order/todas", {
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
  }, [user, token, navigate]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 p-8">
      <div className="max-w-5xl mx-auto bg-black/60 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-white/10 text-white">
        <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">Panel de Órdenes</h1>

        {cargando ? (
          <p className="text-center text-gray-300">Cargando órdenes...</p>
        ) : ordenes.length === 0 ? (
          <p className="text-center text-gray-300">No hay órdenes registradas.</p>
        ) : (
          <div className="space-y-8">
            {ordenes.map((orden) => (
              <div key={orden._id} className="bg-white/10 p-6 rounded-xl border border-white/10">
                <p className="text-sm text-gray-400 mb-2">
                  <strong>Fecha:</strong> {new Date(orden.createdAt).toLocaleString("es-CL")}
                </p>
                <p><strong>Cliente:</strong> {orden.usuario?.nombre} ({orden.usuario?.correo})</p>
                <p><strong>Nombre en orden:</strong> {orden.nombre}</p>
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
    </section>
  );
};

export default AdminOrdenes;