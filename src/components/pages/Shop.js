import React, { useEffect, useState } from "react";

import StoreGetApi from "../../apis/StoreGetApi";
import useDispatchFunc from "../../hooks/useDispatchFunc";
import DisplayCards from "../public/DisplayCards";

const Shop = () => {
  const [productsArray, setProductsArray] = useState();

  const dispatch = useDispatchFunc();

  useEffect(() => {
    (async () => {
      dispatch({ type: "startLoading" });
      const response = await StoreGetApi();
      dispatch({ type: "stopLoading" });
      if (response.data.type === "success") {
        //getting random array
        const arr = response.data.productFound;
        const sortedArr = arr.sort(() => Math.random() - 0.5);
        setProductsArray(sortedArr);

        dispatch({
          type: "snackBar",
          payload: { msg: response.data.msg, type: "success" },
        });
      } else {
        dispatch({
          type: "snackBar",
          payload: { msg: response.data.msg, type: "error" },
        });
      }
    })();
  }, [dispatch]);

  return <>{productsArray && <DisplayCards productsArray={productsArray} />}</>;
};

export default Shop;