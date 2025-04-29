import { useState } from "react";

export default function Productos() {
  // Array de productos de ejemplo
  const productos = [
    {
      id: 1,
      nombre: "Polvo Rojo Ferrari",
      precio: 99990,
      imagen: "https://via.placeholder.com/400x250?text=Polvo+Rojo",
    },
    {
      id: 2,
      nombre: "Cerakote Negro Mate",
      precio: 129990,
      imagen: "https://via.placeholder.com/400x250?text=Cerakote+Negro",
    },
    {
      id: 3,
      nombre: "Fibra de Carbono Gloss",
      precio: 149990,
      imagen: "https://via.placeholder.com/400x250?text=Fibra+Carbono",
    },
  ];

  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const nuevoCarrito = [...prevCarrito, producto];
      console.log("Carrito actualizado:", nuevoCarrito);
      return nuevoCarrito;
    });
  };
  
    return (
    <section className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Nuestro Catálogo
        </h1>

        {/* Grid de productos */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {productos.map((producto) => (
            <div key={producto.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={producto.imagen} alt={producto.nombre} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{producto.nombre}</h2>
                <p className="text-gray-600 mb-4">${producto.precio.toLocaleString("es-CL")}</p>
                <button
                  onClick={() => agregarAlCarrito(producto)}
                  className="w-full bg-yellow-400 text-gray-900 font-bold py-2 rounded hover:bg-yellow-300 transition"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}