import useUserValidations from "../hooks/useUserValidations";

const AdminProtected = ({ children, redirect }) => {
  const [checkAuth, isAdmin] = useUserValidations();

  return checkAuth() && isAdmin() ? children : redirect;
};

export default AdminProtected;