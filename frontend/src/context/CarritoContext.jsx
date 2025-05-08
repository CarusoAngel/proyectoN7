import { createContext, useContext, useReducer } from "react";

// Estado inicial del carrito
const initialState = {
  carrito: []
};

// Reducer del carrito
function carritoReducer(state, action) {
  switch (action.type) {
    case "AGREGAR_PRODUCTO":
      const existente = state.carrito.find((item) => item._id === action.payload._id);
      if (existente) {
        if (existente.cantidad < existente.stock) {
          return {
            carrito: state.carrito.map((item) =>
              item._id === action.payload._id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            )
          };
        }
        return state; // no permite agregar más de lo que hay en stock
      }
      return {
        carrito: [...state.carrito, { ...action.payload, cantidad: 1 }]
      };

    case "ELIMINAR_PRODUCTO":
      return {
        carrito: state.carrito.filter((item) => {
          const idProducto = item._id || item.productoId || item.id;
          return idProducto !== action.payload;
        })
      };

    case "VACIAR_CARRITO":
      return {
        carrito: []
      };

    default:
      return state;
  }
}

// Crear el contexto
const CarritoContext = createContext();

// Proveedor
export const CarritoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(carritoReducer, initialState);

  return (
    <CarritoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CarritoContext.Provider>
  );
};

// Hook personalizado
export const useCarrito = () => useContext(CarritoContext);