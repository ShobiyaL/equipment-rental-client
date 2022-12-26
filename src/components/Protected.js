import useUserValidations from "../hooks/useUserValidations";

const Protected = ({ children, redirect }) => {
  const [checkAuth] = useUserValidations();

  return checkAuth() ? children : redirect;
};

export default Protected;