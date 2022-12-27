import { useReducer, useEffect } from "react";
import initialValues from "./InitialValues";
import ReducerFunc from "./ReducerFunc";

const useStore = () => {
  const [state, dispatch] = useReducer(ReducerFunc, initialValues, () => {
    const tokenVal = JSON.parse(localStorage.getItem("token"));
    const roleVal = JSON.parse(localStorage.getItem("role"));
    const cartVal = JSON.parse(localStorage.getItem("cart"));

    return {
      ...initialValues,
      token: tokenVal || "",
      role: roleVal || "",
      cart: cartVal || "",
    };
  });

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(state.token));
    localStorage.setItem("role", JSON.stringify(state.role));
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.token, state.role, state.cart]);

  return [state, dispatch];
};

export default useStore;