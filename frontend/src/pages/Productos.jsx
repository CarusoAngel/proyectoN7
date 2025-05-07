import { useEffect, useState } from "react";

export default function Productos({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/product");
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <section className="relative min-h-screen px-6 py-20 bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="absolute inset-0 bg-[url('/src/assets/background-stellare.webp')] bg-cover bg-center opacity-30 z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-white text-center mb-12 drop-shadow-lg">
          Catálogo de Productos
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {productos.map((producto) => (
            <div
              key={producto._id}
              className="flex flex-col justify-between bg-black/60 backdrop-blur-md p-6 rounded-2xl shadow-xl text-white border border-white/10"
            >
              <div>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-48 object-contain rounded-xl mb-4 bg-white"
                />
                <h3 className="text-2xl font-bold mb-2">{producto.nombre}</h3>
                <p className="text-gray-300 mb-4">{producto.descripcion}</p>
                <p className="text-lg font-semibold mb-6">
                  ${producto.precio.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => agregarAlCarrito(producto)}
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-2 px-4 rounded-full transition-all duration-200 mt-auto"
              >
                Agregar al Carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
