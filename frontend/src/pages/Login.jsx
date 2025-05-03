import { useState } from "react";
import { loginUser } from "../services/loginUser";

export default function Login() {
  const [form, setForm] = useState({ correo: "", password: "" });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    try {
      const data = await loginUser(form);
      localStorage.setItem("token", data.token);
      setMensaje("Inicio de sesión exitoso");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        <label className="block mb-2 text-sm font-bold text-gray-700">
          Correo electrónico
        </label>
        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-2 text-sm font-bold text-gray-700">
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Iniciar sesión
        </button>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {mensaje && <p className="mt-4 text-green-500 text-center">{mensaje}</p>}
      </form>
    </div>
  );
}
