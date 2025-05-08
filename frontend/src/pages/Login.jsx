import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useUser();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/v1/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.user));
        dispatch({ type: "LOGIN", payload: { user: data.user, token: data.token } });
        navigate("/perfil");
      } else {
        alert(data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="absolute inset-0 bg-[url('/src/assets/background-stellare.webp')] bg-cover bg-center opacity-30 z-0"></div>

      <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>
      </div>
    </section>
  );
}