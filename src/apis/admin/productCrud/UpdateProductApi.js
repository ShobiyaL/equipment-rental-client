import axios from "axios";

const UpdateProductApi = async (id, body, token) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_PRODUCTUPDATE}/${id}`,
      body,
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

export default UpdateProductApi;