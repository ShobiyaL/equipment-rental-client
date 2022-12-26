import { useReducer, useEffect } from "react";
import initialValues from "./InitialValues";
import ReducerFunc from "./ReducerFunc";

const useStore = () => {
  const [state, dispatch] = useReducer(ReducerFunc, initialValues, () => {
    const tokenVal = localStorage.getItem("token");
    const roleVal = localStorage.getItem("role");
    const cartVal = localStorage.getItem("cart");

    return {
      ...initialValues,
      token: tokenVal || "",
      role: roleVal || "",
      cart: cartVal || "",
    };
  });

  useEffect(() => {
    localStorage.setItem("token", state.token);
    localStorage.setItem("role", state.role);
    localStorage.setItem("cart", state.cart);
  }, [state.token, state.role, state.cart]);

  return [state, dispatch];
};

export default useStore;