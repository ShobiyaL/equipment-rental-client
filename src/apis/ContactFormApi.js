import axios from "axios";

const ContactFormApi = async (data) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_CONTACTFORMAPI,
      data
    );

    return response;
  } catch (e) {
    return e.response;
  }
};

export default ContactFormApi;