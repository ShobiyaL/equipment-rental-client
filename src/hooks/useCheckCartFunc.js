import useStateValFunc from "./useStateValFunc";

const useCheckCartFunc = (id) => {
  const [{ cart }] = useStateValFunc();

  if (cart.length === 0) {
    return false;
  } else {
    const idPresent = cart.filter((cartIdObj) => cartIdObj.id === id);
    return idPresent.length > 0 ? true : false;
  }
};

export default useCheckCartFunc;