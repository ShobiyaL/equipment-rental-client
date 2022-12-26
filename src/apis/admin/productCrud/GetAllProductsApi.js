import axios from "axios";

const GetAllProductsApi = async (token) => {
  try {
    const response = await axios.get(process.env.REACT_APP_PRODUCTGETALL, {
      headers: {
        authorization: `BEARER ${token}`,
      },
    });

    return response;
  } catch (e) {
    return e.response;
  }
};

export default GetAllProductsApi;