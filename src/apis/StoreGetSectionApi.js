import axios from "axios";

const StoreGetSectionApi = async (sectionName) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SECTIONGETDATA}/${sectionName}`
    );

    return response;
  } catch (e) {
    return e.response;
  }
};

export default StoreGetSectionApi;