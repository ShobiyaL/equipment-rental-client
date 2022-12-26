import axios from "axios";

const StoreGetApi = async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_STOREGETALL);

    return response;
  } catch (e) {
    return e.response;
  }
};

export default StoreGetApi;