import { useContext } from "react";
import AppContext from "../context/AppContext";

const useStateValFunc = () => {
  const { state } = useContext(AppContext);
  return [state];
};

export default useStateValFunc;