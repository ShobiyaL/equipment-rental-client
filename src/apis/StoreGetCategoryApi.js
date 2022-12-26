import axios from "axios";

const StoreGetCategoryApi = async (categoryName) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_CATEGORYGETDATA}/${categoryName}`
    );

    return response;
  } catch (e) {
    return e.response;
  }
};

export default StoreGetCategoryApi;