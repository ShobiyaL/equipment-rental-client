import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import StoreGetSectionApi from "../../apis/StoreGetSectionApi";
  import { categoryArray } from "../../helpers/ProductCreateHelper";
  import useDispatchFunc from "../../hooks/useDispatchFunc";
  import DisplayCards from "../public/DisplayCards";
  
  const SectionsStore = () => {
    const [categoryState, setCategoryState] = useState("");
    const [sectionData, setSectionData] = useState();
    const [categoryStateArray, setCategoryStateArray] = useState("");
    const [tempState, setTempState] = useState("");
  
    const dispatch = useDispatchFunc();
    const params = useParams();
    const { sectionName } = params;
  
    useEffect(() => {
      (async () => {
        dispatch({ type: "startLoading" });
        const response = await StoreGetSectionApi(sectionName);
        dispatch({ type: "stopLoading" });
  
        if (response.data.type === "success") {
          setSectionData(response.data.sectionArray);
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
    }, [dispatch, sectionName]);
  
    useEffect(() => {
      // setting the categoryMenu based on the sectionName
      (() => {
        if (sectionName) {
          const newVal = sectionName;
          const val = categoryArray[0][newVal];
  
          setCategoryStateArray(val);
        }
      })();
    }, [sectionName]);
  
    useEffect(() => {
      //filtering the data according to the category
      if (sectionData) {
        if (categoryState === "") {
          setTempState(null);
          return;
        } else {
          const arr = sectionData;
          const filterArr = arr.filter((item) => item.category === categoryState);
          setTempState(filterArr);
        }
      }
    }, [categoryState, sectionData]);
  
    return (
      <>
        {/* category */}
        <Grid item xs={10} md={8} justifyContent="flex-end" sx={{ mx: 2, mt: 2 }}>
          <FormControl
            variant="standard"
            sx={{ my: 2, width: { xs: "30ch", sm: "35ch", md: "40ch" } }}
          >
            <InputLabel id="product-category">Product Category</InputLabel>
            <Select
              labelId="product-category"
              id="productcategory"
              value={categoryState}
              onChange={(ev) => setCategoryState(ev.target.value)}
              label="Product category"
            >
              <MenuItem value="">Show All Products</MenuItem>
              {categoryStateArray &&
                categoryStateArray.map((categoryVal) => (
                  <MenuItem value={categoryVal} key={categoryVal}>
                    {categoryVal}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Typography variant="h5" sx={{ color: "#ff4081", my: 5 }} align="center">
          Section :{" "}
          {sectionName.split("And")
            ? sectionName.split("And").join(" & ")
            : sectionName.toLocaleUpperCase()}
        </Typography>
        {tempState && categoryState ? (
          <>
            <Typography
              variant="h5"
              sx={{ color: "#ff4081", my: 5 }}
              align="center"
            >
              Category : {categoryState}
            </Typography>
            <DisplayCards productsArray={tempState} />
          </>
        ) : (
          ""
        )}
        {sectionData && !tempState && (
          <>
            <DisplayCards productsArray={sectionData} />
          </>
        )}
      </>
    );
  };
  
  export default SectionsStore;