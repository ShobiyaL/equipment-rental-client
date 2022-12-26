import useStateValFunc from "./useStateValFunc";

const useUserValidations = () => {
  const [{ role, token }] = useStateValFunc();

  const isAdmin = () => {
    return role === "admin" ? true : false;
  };

  const checkAuth = () => {
    return token && role ? true : false;
  };

  return [checkAuth, isAdmin];
};

export default useUserValidations;