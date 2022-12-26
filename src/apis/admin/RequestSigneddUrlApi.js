import axios from "axios";

const RequestSignedUrlApi = async (body, token) => {
  try {
    const response = await axios.post(process.env.REACT_APP_SSSREQUEST, body, {
      headers: {
        authorization: `BEARER ${token}`,
      },
    });
    return response;
  } catch (e) {
    console.log(e, "work3");
    return e.response;
  }
};

export default RequestSignedUrlApi;