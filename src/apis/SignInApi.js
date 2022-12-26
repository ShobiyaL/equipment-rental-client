import axios from "axios";

const SignInApi = async (data) => {
  try {
    const response = await axios.post(process.env.REACT_APP_SIGNINAPI, data);
    return response;
  } catch (e) {
    return e.response;
  }
};
export default SignInApi;