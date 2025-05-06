import { useState } from 'react';

const RegisterForm = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    fechaNacimiento: '',
    password: '',
    file: null,
  });

  const [preview, setPreview] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      const image = files[0];
      setForm({ ...form, file: image });
      setPreview(URL.createObjectURL(image));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    try {
      const res = await fetch('http://localhost:3000/api/v1/user/register', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(`✅ Usuario ${data.user.nombre} registrado correctamente`);
      } else {
        setMensaje(`❌ Error: ${data.detail || data.error}`);
      }
    } catch (error) {
      setMensaje(`❌ Error inesperado: ${error.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-sm text-white"
      encType="multipart/form-data"
    >
      <h3 className="text-xl font-semibold mb-4 text-center">Formulario de Registro</h3>

      <div className="flex flex-col">
        <label className="font-medium">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className="bg-black/20 border border-white/20 text-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium">Apellido</label>
        <input
          type="text"
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          className="bg-black/20 border border-white/20 text-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium">Correo electrónico</label>
        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={handleChange}
          className="bg-black/20 border border-white/20 text-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium">Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          className="bg-black/20 border border-white/20 text-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium">Fecha de nacimiento</label>
        <input
          type="date"
          name="fechaNacimiento"
          value={form.fechaNacimiento}
          onChange={handleChange}
          className="bg-black/20 border border-white/20 text-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium">Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="bg-black/20 border border-white/20 text-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium">Imagen</label>
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleChange}
          className="mt-1 text-white"
          required
        />
      </div>

      {preview && (
        <img
          src={preview}
          alt="Vista previa"
          className="mt-4 rounded-lg shadow-md object-cover w-full max-h-64"
        />
      )}

      <button
        type="submit"
        className="w-full bg-yellow-400 text-black font-bold py-2 rounded-xl hover:bg-yellow-300 transition"
      >
        Registrarse
      </button>

      {mensaje && (
        <p className="mt-4 text-center font-medium">
          {mensaje}
        </p>
      )}
    </form>
  );
};

export default RegisterForm;
