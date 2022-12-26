import axios from "axios";

const VerifyPaymentApi = async (data) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_PAYMENTVERIFY,
      data
    );
    return response;
  } catch (e) {
    return e.response;
  }
};
export default VerifyPaymentApi;