import axios from "axios";

const GetAllMsgApi = async (token) => {
  try {
    const response = await axios.get(process.env.REACT_APP_GETALLMSG, {
      headers: {
        authorization: `BEARER ${token}`,
      },
    });

    return response;
  } catch (e) {
    return e.response;
  }
};

export default GetAllMsgApi;