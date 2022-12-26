import { useContext } from "react";
import AppContext from "../context/AppContext";

const useDispatchFunc = () => {
  const { dispatch } = useContext(AppContext);
  return dispatch;
};
export default useDispatchFunc;