import {
    Button,
    Container,
    Grid,
    Slider,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import React, { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  
  import GetOneProductApi from "../../apis/admin/productCrud/GetOneProductApi";
  
  import useDispatchFunc from "../../hooks/useDispatchFunc";
  import useStateValFunc from "../../hooks/useStateValFunc";
  
  import EditIcon from "@mui/icons-material/Edit";
  import CancelIcon from "@mui/icons-material/Cancel";
  import UpdateProductApi from "../../apis/admin/productCrud/UpdateProductApi";
  
  const ProductGetOne = () => {
    const initialValue = {
      name: "",
      desc: "",
      price: "",
      qty: "",
    };
    const [state, setState] = useState(initialValue);
    const [disableState, setDisableState] = useState(true);
  
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id;
    const [{ token }] = useStateValFunc();
    const dispatch = useDispatchFunc();
  
    useEffect(() => {
      (async () => {
        dispatch({ type: "startLoading" });
        const response = await GetOneProductApi(id, token);
        dispatch({ type: "stopLoading" });
        if (response.data.type === "success") {
          dispatch({
            type: "snackBar",
            payload: { msg: response.data.msg, type: "success" },
          });
          setState(response.data.productFound);
        } else {
          dispatch({
            type: "snackBar",
            payload: { msg: response.data.msg, type: "error" },
          });
        }
      })();
    }, [dispatch, id, token]);
  
    const onChangeHandler = (ev) => {
      setState((prevState) => ({
        ...prevState,
        [ev.target.name]: ev.target.value,
      }));
    };
  
    const onSubmitHandler = async () => {
      //use a state to check whether edit button is pressed or else it remains disabled
      if (disableState) {
        return;
      }
      dispatch({ type: "startLoading" });
      const response = await UpdateProductApi(id, state, token);
      dispatch({ type: "stopLoading" });
      if (response.data.type === "success") {
        dispatch({
          type: "snackBar",
          payload: { msg: response.data.msg, type: "success" },
        });
        navigate(`/admin/crud/productGetAll`);
      } else {
        dispatch({
          type: "snackBar",
          payload: { msg: response.data.msg, type: "error" },
        });
        navigate(`/admin/crud/productGetAll`);
      }
    };
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
              Product Info
            </Typography>
  
            <Grid container sx={{ justifyContent: "center", my: 2 }}>
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
                  disabled={disableState ? true : false}
                />
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
                  disabled={disableState ? true : false}
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
                  disabled={disableState ? true : false}
                />
              </Grid>
  
              {/* qty */}
              <Grid item xs={10} md={8}>
                <Stack
                  sx={{ my: 2, width: { xs: "30ch", sm: "35ch", md: "40ch" } }}
                >
                  <Typography component="label" sx={{ color: "#ff4081" }}>
                    Product Qty : {state.qty}
                  </Typography>
                  {state.qty && (
                    <Slider
                      aria-label="product qty"
                      defaultValue={1}
                      min={1}
                      max={100}
                      step={1}
                      valueLabelDisplay="auto"
                      name="qty"
                      onChange={(ev) => onChangeHandler(ev)}
                      disabled={disableState ? true : false}
                    />
                  )}
                </Stack>
              </Grid>
  
              {/* Create BTN */}
              <Grid item xs={10} md={8}>
                <Stack direction="row">
                  <Button
                    variant="contained"
                    sx={{ background: "#ff4081", my: 1 }}
                    onClick={() => onSubmitHandler()}
                    disabled={disableState ? true : false}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ background: "#ff4081", m: 1 }}
                    startIcon={disableState ? <EditIcon /> : <CancelIcon />}
                    onClick={() => setDisableState((prev) => !prev)}
                  >
                    {disableState ? "Edit" : "Cancel"}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  };
  
  export default ProductGetOne;