import axios from "axios";

const GetOneMsgApi = async (id, token) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_GETONEMSG}/${id}`,
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

export default GetOneMsgApi;