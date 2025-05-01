export default function CarritoDropdown({ carrito, eliminarDelCarrito, vaciarCarrito }) {
    const totalGeneral = carrito.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
  
    return (
      <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md p-4 text-gray-800 z-30">
        <h3 className="text-lg font-semibold mb-2">Carrito</h3>
  
        {carrito.length === 0 ? (
          <p className="text-sm text-gray-500">El carrito está vacío.</p>
        ) : (
          <>
            <ul className="space-y-3 max-h-60 overflow-y-auto">
              {carrito.map((producto, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="w-2/3">
                    <p className="font-medium truncate">{producto.nombre}</p>
                    <p className="text-xs text-gray-600">
                      {producto.cantidad} x ${producto.precio.toLocaleString("es-CL")}
                    </p>
                  </div>
                  <div className="text-right w-1/3">
                    <p className="font-semibold">
                      ${(producto.precio * producto.cantidad).toLocaleString("es-CL")}
                    </p>
                    <button
                      onClick={() => eliminarDelCarrito(index)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
  
            {/* Total */}
            <div className="mt-4 border-t pt-2 text-right">
              <p className="font-bold">
                Total: ${totalGeneral.toLocaleString("es-CL")}
              </p>
            </div>
  
            {/* Botones */}
            <div className="mt-3 flex flex-col gap-2">
              <button className="w-full bg-yellow-400 text-gray-900 font-bold py-2 rounded hover:bg-yellow-300 transition">
                Ver Carrito
              </button>
              <button
                onClick={vaciarCarrito}
                className="w-full bg-red-500 text-white font-bold py-2 rounded hover:bg-red-400 transition text-sm"
              >
                Vaciar Carrito
              </button>
            </div>
          </>
        )}
      </div>
    );
  }  