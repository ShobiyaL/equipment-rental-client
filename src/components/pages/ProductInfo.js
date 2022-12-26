import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDispatchFunc from "../../hooks/useDispatchFunc";

import StoreGetProductApi from "../../apis/StoreGetProductApi";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import useCheckCartFunc from "../../hooks/useCheckCartFunc";
import QtyPicker from "../public/QtyPicker";

const ProductInfo = () => {
  const [productState, setProductState] = useState();
  const [qtySelectedState, setQuantityStateSelected] = useState("");

  const params = useParams();
  const { id } = params;

  const cartCheck = useCheckCartFunc(id);
  const dispatch = useDispatchFunc();

  useEffect(() => {
    (async () => {
      dispatch({ type: "startLoading" });
      const response = await StoreGetProductApi(id);
      dispatch({ type: "stopLoading" });
      if (response.data.type === "success") {
        setProductState(response.data.productFound);
        dispatch({
          type: "snackBar",
          payload: { msg: response.data.msg, type: "success" },
        });
      } else {
        dispatch({
          type: "snackBar",
          payload: { msg: response.data.msg, type: "success" },
        });
      }
    })();
  }, [dispatch, id]);

  const cartAdderFunc = () => {
    const idObj = {
      id,
      imgUrl: productState.url,
      name: productState.name,
      price: productState.price,
      qtyNeeded: qtySelectedState,
      section: productState.section,
      category: productState.category,
    };
    dispatch({
      type: "ADDTOCART",
      payload: { idObj },
    });
  };

  const cartRemoverFunc = () => {
    dispatch({
      type: "REMOVEFROMCART",
      payload: { id },
    });
  };

  const qtySelectorFunc = (selectedVal) => {
    setQuantityStateSelected(selectedVal);
  };

  return (
    <>
      <>
        {productState && (
          <>
            <Container maxWidth="lg" sx={{ my: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={7}>
                  <Box sx={{ p: { xs: 0, md: 5 } }}>
                    <img
                      src={productState.url}
                      alt={productState.name}
                      loading="lazy"
                      width="100%"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={5}>
                  <Box
                    sx={{ p: { xs: 0, md: 4 }, my: { xs: 0, md: 3, lg: 5 } }}
                  >
                    <Card>
                      <CardContent>
                        <Typography variant="h4">
                          {productState.name}
                        </Typography>
                      </CardContent>
                      <Divider />
                      <CardContent>
                        <Typography variant="h6" sx={{ color: "#ff4081" }}>
                          ₹{productState.price}.00
                        </Typography>
                      </CardContent>
                      <Divider />
                      <CardContent>
                        {cartCheck ? (
                          ""
                        ) : (
                          <QtyPicker
                            stockMax={productState.qty}
                            selectedQty={qtySelectedState}
                            qtySelectorFunc={qtySelectorFunc}
                          />
                        )}
                      </CardContent>
                      <CardActions sx={{ p: 3, my: 2 }}>
                        {/* CART Add/Remove Btns */}
                        {cartCheck ? (
                          <Button
                            variant="contained"
                            fullWidth
                            sx={{ background: "#ff4081" }}
                            onClick={() => {
                              cartRemoverFunc();
                            }}
                          >
                            Remove from cart
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            fullWidth
                            disabled={qtySelectedState ? false : true}
                            sx={{ background: "#ff4081" }}
                            onClick={() => {
                              cartAdderFunc();
                            }}
                          >
                            Add to Cart
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  </Box>
                </Grid>
              </Grid>
              {/* description */}
              <Grid container justifyContent="center">
                <Grid item xs={12} md={9}>
                  {/* <Card
                    sx={{ p: { xs: 0, md: 3 }, my: { xs: 3, md: 3, lg: 5 } }}
                  >
                    <Typography variant="h6" sx={{ p: { xs: 2, md: 5 } }}>
                      {productState.desc}
                    </Typography>
                  </Card> */}

                  <Box
                    sx={{
                      "& .MuiInput-input": {
                        color: "#ff4081 !important",
                      },
                      "& .MuiInputBase-input": {
                        color: "#ff4081 !important",
                      },

                      "& .MuiInputBase-inputMultiline": {
                        color: "#ff4081 !important",
                      },
                      "& .css-66dh3a-MuiInputBase-input-MuiInput-input": {
                        color: "#ff4081 !important",
                      },
                      "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root": {
                        color: "#1976d2",
                        fontWeight: "bold",
                        fontSize: "1.3rem",
                      },
                      "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-disabled":
                        {
                          color: "#1976d2",
                        },
                      "& .css-66dh3a-MuiInputBase-input-MuiInput-input.Mui-disabled":
                        {
                          WebkitTextFillColor: "unset",
                        },
                    }}
                  >
                    <TextField
                      id="desc"
                      label="Product Description :"
                      variant="standard"
                      multiline
                      rows={20}
                      sx={{
                        my: "3rem",
                        width: { xs: "40ch", sm: "55ch", md: "80ch" },
                        color: "pink",
                      }}
                      name="desc"
                      value={productState.desc}
                      disabled={true}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </>
        )}
      </>
    </>
  );
};

export default ProductInfo;