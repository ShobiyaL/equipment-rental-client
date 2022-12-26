import axios from "axios";

const GetAllOrdersApi = (token) => {
  try {
    const response = axios.get(process.env.REACT_APP_GETALLORDERS, {
      headers: {
        authorization: `BEARER ${token}`,
      },
    });
    return response;
  } catch (e) {
    return e.response;
  }
};

export default GetAllOrdersApi;