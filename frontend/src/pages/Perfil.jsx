import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Perfil() {
  const { user, token, dispatch } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
    }
  }, [token, user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="absolute inset-0 bg-[url('/src/assets/background-stellare.webp')] bg-cover bg-center opacity-30 z-0"></div>

      <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10 text-white text-center">
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
    </section>
  );
}