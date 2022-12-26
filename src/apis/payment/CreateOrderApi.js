import axios from "axios";

const CreateOrderApi = async (data) => {
  try {
    const response = await axios.post(process.env.REACT_APP_ORDERCREATE, data);
    return response;
  } catch (e) {
    return e.response;
  }
};
export default CreateOrderApi;