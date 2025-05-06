import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    fechaNacimiento: "",
    password: "",
  });
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useUser();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagen) {
      alert("Debes subir una imagen");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }
      formData.append("file", imagen);

      const response = await fetch("http://localhost:3000/api/v1/user/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.user));
        dispatch({ type: "LOGIN", payload: { user: data.user, token: data.token } });
        navigate("/perfil");
      } else {
        alert(data.message || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="absolute inset-0 bg-[url('/src/assets/background-stellare.webp')] bg-cover bg-center opacity-30 z-0"></div>

      <div className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">Crear Cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/90 text-gray-800" required />
          <input type="text" name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/90 text-gray-800" required />
          <input type="email" name="correo" placeholder="Correo electrónico" value={form.correo} onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/90 text-gray-800" required />
          <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/90 text-gray-800" required />
          <input type="tel" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/90 text-gray-800" required />
          <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/90 text-gray-800" required />
          <input type="file" name="file" accept="image/*" onChange={(e) => setImagen(e.target.files[0])}
            className="w-full p-3 rounded-xl bg-white/90 text-gray-800" required />

          <button type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl transition-all duration-200 disabled:opacity-50">
            {loading ? "Registrando..." : "Registrarme"}
          </button>
        </form>
      </div>
    </section>
  );
}