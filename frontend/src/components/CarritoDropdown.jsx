import { useNavigate } from "react-router-dom";

export default function CarritoDropdown({ carrito, eliminarDelCarrito, vaciarCarrito }) {
  const totalGeneral = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const navigate = useNavigate();

  const irAlCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-black/70 backdrop-blur-md shadow-2xl rounded-2xl p-4 text-white z-30">
      <h3 className="text-lg font-bold mb-3 border-b border-white/20 pb-2">Carrito</h3>

      {carrito.length === 0 ? (
        <p className="text-sm text-gray-300">Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-500">
            {carrito.map((producto) => {
              console.log("Producto en carrito:", producto);

              const idProducto = producto._id || producto.productoId || producto.id;

              return (
                <li key={idProducto || producto.nombre} className="flex justify-between items-center text-sm">
                  <div className="w-2/3">
                    <p className="font-medium truncate text-white">{producto.nombre}</p>
                    <p className="text-xs text-gray-400">
                      {producto.cantidad} x ${producto.precio.toLocaleString("es-CL")}
                    </p>
                  </div>
                  <div className="text-right w-1/3">
                    <p className="font-semibold text-yellow-400">
                      ${(producto.precio * producto.cantidad).toLocaleString("es-CL")}
                    </p>
                    <button
                      onClick={() => eliminarDelCarrito(idProducto)}
                      className="text-xs text-red-400 hover:text-red-300 mt-1 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 border-t border-white/20 pt-3 text-right">
            <p className="text-base font-bold text-yellow-300">
              Total: ${totalGeneral.toLocaleString("es-CL")}
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={irAlCheckout}
              className="w-full bg-yellow-400 text-black font-bold py-2 rounded-xl hover:bg-yellow-300 transition"
            >
              Ver Carrito
            </button>
            <button
              onClick={vaciarCarrito}
              className="w-full bg-red-600 text-white font-bold py-2 rounded-xl hover:bg-red-500 transition text-sm"
            >
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}