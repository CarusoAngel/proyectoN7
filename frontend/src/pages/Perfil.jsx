import { useEffect, useState } from "react";

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [mensaje, setMensaje] = useState("Verificando sesión...");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMensaje("No estás autenticado.");
      return;
    }

    fetch("http://localhost:3000/api/v1/user/verifytoken", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
          setMensaje("");
        } else {
          setMensaje("Token inválido o expirado.");
        }
      })
      .catch(() => {
        setMensaje("Error al verificar token.");
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <h2 className="text-3xl font-bold mb-6">
        {user?.nombre ? `Perfil de, ${user.nombre}` : "Perfil de Usuario"}
      </h2>

      {mensaje && <p className="text-red-600 font-medium">{mensaje}</p>}

      {user && (
        <div className="bg-white p-6 rounded shadow-md text-center max-w-sm w-full">
          {user.imagen ? (
            <img
              src={user.imagen}
              alt={`Foto de perfil de ${user.nombre}`}
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-yellow-400"
            />
          ) : (
            <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-full mx-auto mb-4 border-4 border-yellow-400 text-gray-500 text-sm">
              Sin imagen
            </div>
          )}
          <p className="text-xl font-semibold mb-2">ID: {user.id}</p>
          <p className="text-lg mb-2">Correo: {user.correo}</p>
          <p className="text-lg text-green-700">Token válido ✅</p>
        </div>
      )}
    </div>
  );
}