import axios from "axios";

const GetOrdersApi = async (token) => {
  try {
    const response = await axios.get(process.env.REACT_APP_GETORDERS, {
      headers: {
        authorization: ` BEARER ${token}`,
      },
    });

    return response;
  } catch (e) {
    return e.response;
  }
};
export default GetOrdersApi;