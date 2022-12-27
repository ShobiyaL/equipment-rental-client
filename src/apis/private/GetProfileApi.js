import axios from "axios";

const GetProfileApi = async (token) => {
  try {
    const response = await axios.get(process.env.REACT_APP_GETPROFILE, {
      headers: {
        authorization: ` BEARER ${token}`,
      },
    });
    return response;
    
  } catch (error) {
    return error.response;
  }
};
export default GetProfileApi;