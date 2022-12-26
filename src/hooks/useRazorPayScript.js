import { useEffect } from "react";

const useRazorPayScript = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default useRazorPayScript;