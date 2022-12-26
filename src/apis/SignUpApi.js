import axios from "axios";

const SignUpApi = async (data) => {
  try {
    const response = await axios.post(process.env.REACT_APP_SIGNUPAPI, data);
    return response;
  } catch (e) {
    return e.response;
  }
};
export default SignUpApi;