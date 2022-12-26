import axios from "axios";

const GetOneProductApi = async (id, token) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_PRODUCTGETONE}/${id}`,
      {
        headers: {
          authorization: `BEARER ${token}`,
        },
      }
    );

    return response;
  } catch (e) {
    return e.response;
  }
};

export default GetOneProductApi;