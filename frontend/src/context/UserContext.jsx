import { createContext, useReducer, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("usuario")) || null,
  token: localStorage.getItem("token") || null,
};

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        user: null,
        token: null,
      };
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const verificarToken = async () => {
      if (!state.token) return;

      try {
        const res = await fetch("http://localhost:3000/api/v1/user/verifytoken", {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          dispatch({ type: "LOGIN", payload: { user: data.user, token: state.token } });
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("usuario");
          dispatch({ type: "LOGOUT" });
          navigate("/login");
        }
      } catch (error) {
        console.error("Error al verificar token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      }
    };

    verificarToken();
  }, [state.token, navigate]);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

