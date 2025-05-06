export default function Productos({ agregarAlCarrito }) {
  const productos = [
    {
      id: 1,
      nombre: "Powder Coating Negro Mate",
      descripcion: "Acabado resistente y elegante para metal.",
      precio: 15900,
    },
    {
      id: 2,
      nombre: "Cerakote Gris Titanio",
      descripcion: "Ideal para piezas de alto rendimiento.",
      precio: 22500,
    },
    {
      id: 3,
      nombre: "Kit Fibra de Carbono",
      descripcion: "Laminado de alta calidad para interior automotriz.",
      precio: 38990,
    },
  ];

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
              key={producto.id}
              className="flex flex-col justify-between bg-black/60 backdrop-blur-md p-6 rounded-2xl shadow-xl text-white border border-white/10"
            >
              <div>
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
