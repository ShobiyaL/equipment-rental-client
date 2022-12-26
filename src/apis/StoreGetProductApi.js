import axios from "axios";

const StoreGetProductApi = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_STOREGETPRODUCTONE}/${id}`
    );

    return response;
  } catch (e) {
    return e.response;
  }
};

export default StoreGetProductApi;