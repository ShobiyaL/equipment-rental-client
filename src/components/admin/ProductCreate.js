import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState, useEffect } from "react";
  import CreateProductApi from "../../apis/admin/productCrud/CreateProductApi";
//   import RequestSignedUrlApi from "../../apis/admin/RequestSignedUrlApi";
//   import UploadImgToS3Api from "../../apis/admin/UploadImgToS3Api";
  import useDispatchFunc from "../../hooks/useDispatchFunc";
  import useStateValFunc from "../../hooks/useStateValFunc";
  
  import { sectionArray, categoryArray } from "../../helpers/ProductCreateHelper";
  import { useNavigate } from "react-router-dom";
  
  const ProductCreate = () => {
    const initialValue = {
      uploadImg: undefined,
      name: "",
      desc: "",
      price: "",
      section: "",
      category: "",
      qty: "",
    };
    const [state, setState] = useState(initialValue);
    const [categoryState, setCategoryState] = useState(undefined);
  
    const [{ token }] = useStateValFunc();
    const dispatch = useDispatchFunc();
    const navigate = useNavigate();
  
    useEffect(() => {
      (() => {
        if (state.section) {
          const newVal = state.section;
          const val = categoryArray[0][newVal];
  
          setCategoryState(val);
        }
      })();
    }, [state.section]);
  
    const onChangeHandler = (ev) => {
      if (ev.target.name === "uploadImg") {
        setState((prevState) => ({
          ...prevState,
          [ev.target.name]: ev.target.files[0],
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          [ev.target.name]: ev.target.value,
        }));
      }
      if (ev.target.name === "section") {
        setState((prevState) => ({
          ...prevState,
          category: "",
        }));
      }
    };
  
    //biggest submitHandler
    // const onSubmitHandler = async () => {
    //   if (state.uploadImg) {
    //     //img appending to formData
    //     const formData = new FormData();
    //     formData.append("file", state.uploadImg, state.uploadImg.name);
    //     dispatch({ type: "startLoading" });
  
    //     //request PreSignedUrl from S3 via our server
    //     const body = {
    //       section: `${state.section}/${state.category}`,
    //       name: state.uploadImg.name,
    //     };
    //     // const response = await RequestSignedUrlApi(body, token);
  
    //     //if signedUrlApi got success....
    //     if (response.data.type === "success") {
    //       dispatch({
    //         type: "snackBar",
    //         payload: { msg: response.data.msg, type: "success" },
    //       });
    //       //now we have s3url, upload our img to that url directly from client to awsS3 bucket
    //       const uploadUrl = response.data.uploadUrl;
    //       const uploadImg = state.uploadImg;
    //       const s3Response = await UploadImgToS3Api(uploadUrl, uploadImg);
  
    //       //if img upload to s3 successful...
    //       if (s3Response.status === 200) {
    //         //now we uploaded img,now store the imgurl+other product info
    //         // in db via our server (POST request) ---finalApi call
    //         //img url is present in the url we got in first step
    //         const receievedUrl = uploadUrl.split("?")[0];
    //         const productBody = {
    //           url: receievedUrl,
    //           name: state.name,
    //           section: state.section,
    //           category: state.category,
    //           price: state.price,
    //           desc: state.desc,
    //           qty: state.qty,
    //         };
    //         const productRes = await CreateProductApi(productBody, token);
  
    //         //if createProductApi is successful
    //         if (productRes.data.type === "success") {
    //           dispatch({
    //             type: "snackBar",
    //             payload: { msg: productRes.data.msg, type: "success" },
    //           });
    //           // product created by now....
    //           navigate("/admin/crud");
    //         }
    //         //if createProductApi is failed
    //         else {
    //           dispatch({
    //             type: "snackBar",
    //             payload: { msg: productRes.data.msg, type: "error" },
    //           });
    //         }
    //       } //if img upload to s3 failed
    //       else {
    //         dispatch({
    //           type: "snackBar",
    //           payload: { msg: s3Response.data.msg, type: "error" },
    //         });
    //       }
    //     } //if signedUrlApi got failed
    //     else {
    //       dispatch({
    //         type: "snackBar",
    //         payload: { msg: response && response.data.msg, type: "error" },
    //       });
    //       setState(null);
    //     }
    //     dispatch({ type: "stopLoading" });
    //   }
    // };
  
    return (
      <>
        <Box
          sx={{
            py: 2,
            my: 3,
            "& .MuiTextField-root": {
              my: 2,
              width: { xs: "30ch", sm: "35ch", md: "40ch" },
            },
          }}
        >
          <Container
            maxWidth="md"
            sx={{ py: 2, my: 2, border: "4px solid pink" }}
          >
            <Typography variant="h6" sx={{ color: "#ff4081" }} align="center">
              Create Product
            </Typography>
  
            <Grid container sx={{ justifyContent: "center", my: 2 }}>
              {/* UploadImg */}
              <Grid item xs={10} md={8}>
                <Stack component="form">
                  <Box component="label" sx={{ color: "#ff4081" }}>
                    Upload Product Image :
                  </Box>
                  <Input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    name="uploadImg"
                    onChange={(ev) => onChangeHandler(ev)}
                    sx={{ width: { xs: "30ch", sm: "35ch", md: "40ch" } }}
                  />
                </Stack>
              </Grid>
  
              {/* name */}
              <Grid item xs={10} md={8}>
                <TextField
                  id="name"
                  label="Product Name"
                  variant="standard"
                  required
                  name="name"
                  value={state.name}
                  onChange={(ev) => onChangeHandler(ev)}
                />
              </Grid>
  
              {/* section */}
              <Grid item xs={10} md={8}>
                <FormControl
                  variant="standard"
                  sx={{ my: 2, width: { xs: "30ch", sm: "35ch", md: "40ch" } }}
                >
                  <InputLabel id="product-section">Product Section</InputLabel>
                  <Select
                    labelId="product-section"
                    id="section"
                    name="section"
                    value={state.section}
                    onChange={(ev) => onChangeHandler(ev)}
                    label="Product Section"
                  >
                    {sectionArray.map((val) => (
                      <MenuItem value={val} key={val}>
                        {val}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
  
              {/* category */}
              <Grid item xs={10} md={8}>
                <FormControl
                  variant="standard"
                  sx={{ my: 2, width: { xs: "30ch", sm: "35ch", md: "40ch" } }}
                >
                  <InputLabel id="product-category">Product Category</InputLabel>
                  <Select
                    labelId="product-category"
                    id="productcategory"
                    name="category"
                    value={state.category}
                    onChange={(ev) => onChangeHandler(ev)}
                    label="Product category"
                  >
                    {categoryState &&
                      categoryState.map((categoryVal) => (
                        <MenuItem value={categoryVal} key={categoryVal}>
                          {categoryVal}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
  
              {/* desc */}
              <Grid item xs={10} md={8}>
                <TextField
                  id="desc"
                  label="Product Description"
                  multiline
                  rows={7}
                  sx={{
                    my: "3rem",
                    width: { xs: "30ch", sm: "35ch", md: "40ch" },
                  }}
                  required
                  name="desc"
                  value={state.desc}
                  onChange={(ev) => onChangeHandler(ev)}
                />
              </Grid>
  
              {/* price */}
              <Grid item xs={10} md={8}>
                <TextField
                  id="price"
                  label="Product Price"
                  variant="standard"
                  required
                  type="number"
                  name="price"
                  value={state.price}
                  onChange={(ev) => onChangeHandler(ev)}
                />
              </Grid>
  
              {/* qty */}
              <Grid item xs={10} md={8}>
                <Stack
                  sx={{ my: 2, width: { xs: "30ch", sm: "35ch", md: "40ch" } }}
                >
                  <Typography component="label" sx={{ color: "#ff4081" }}>
                    Product Qty :
                  </Typography>
                  <Slider
                    aria-label="product qty"
                    defaultValue={1}
                    min={1}
                    max={100}
                    step={1}
                    valueLabelDisplay="auto"
                    name="qty"
                    onChange={(ev) => onChangeHandler(ev)}
                  />
                </Stack>
              </Grid>
  
              {/* Create BTN */}
              {/* <Grid item xs={10} md={8}>
                <Button
                  variant="contained"
                  sx={{ background: "#ff4081", my: 1 }}
                  onClick={() => onSubmitHandler()}
                >
                  Create
                </Button>
              </Grid> */}
            </Grid>
          </Container>
        </Box>
      </>
    );
  };
  
  export default ProductCreate;