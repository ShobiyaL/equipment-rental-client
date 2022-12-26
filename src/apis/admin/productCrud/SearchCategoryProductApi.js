import axios from "axios";

const SearchCategoryProductApi = async (categoryValue, token) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_PRODUCTSEARCHCATEGORY,
      categoryValue,
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

export default SearchCategoryProductApi;