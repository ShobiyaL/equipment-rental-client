import axios from "axios";

const SendEmailApi = async (data, token) => {
  try {
    const response = await axios.post(process.env.REACT_APP_MAILSEND, data, {
      headers: {
        authorization: `BEARER ${token}`,
      },
    });
    return response;
  } catch (e) {
    return e.response;
  }
};
export default SendEmailApi;