import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import React, { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import CreateOrderApi from "../../apis/payment/CreateOrderApi";
  import VerifyPaymentApi from "../../apis/payment/VerifyPaymentApi";
  import SnackBars from "../../helpers/SnackBars";
  import useDispatchFunc from "../../hooks/useDispatchFunc";
  import useRazorPayScript from "../../hooks/useRazorPayScript";
  import useStateValFunc from "../../hooks/useStateValFunc";
  
  const Cart = () => {
    const [state, setState] = useState({
      email: "",
      emailHelperText: "",
      orderTotal: "",
    });
    const [{ cart, email, orderTotalAmount }] = useStateValFunc();
    const dispatch = useDispatchFunc();
    const navigate = useNavigate();
  
    //loading razorpayscript hook
    useRazorPayScript();
  
    const checkOutFunc = async () => {
      let amtTotal =
        cart.length > 0
          ? cart
              .map((cartObj) => cartObj.price * cartObj.qtyNeeded)
              .reduce((acc, val) => acc + val)
          : "";
      //here send orderAmount,email,cartArray
      const createOrderData = {
        orderAmount: orderTotalAmount || state.orderTotal || amtTotal,
        cartArray: cart,
        email: state.email || email,
      };
  
      dispatch({ type: "startLoading" });
      const orderCreatedResponse = await CreateOrderApi(createOrderData);
      dispatch({ type: "stopLoading" });
      if (orderCreatedResponse.data.type !== "success") {
        dispatch({
          type: "snackBar",
          payload: { type: "error", msg: "try Again" },
        });
        return;
      }
      dispatch({ type: "startLoading" });
      //orderCreate success -notify user
      dispatch({
        type: "snackBar",
        payload: {
          type: "success",
          msg: orderCreatedResponse.data.msg,
        },
      });
      //-orderId,razorpayKey,orderAmount received from server after creating orderID
      const { razorpayKey, orderId, orderAmount, orderReceipt } =
        orderCreatedResponse.data;
  
      //opening razorpay payment Modal -(completed)
      paymentFunc(razorpayKey, orderAmount, orderReceipt, orderId);
    };
  
    const paymentFunc = (razorpayKey, orderAmount, orderReceipt, orderId) => {
      //opening razorpay payment Modal -(completed)
      var options = {
        key: razorpayKey, // Enter the Key ID generated from the Dashboard
        amount: parseInt(orderAmount), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "equipRentsApp",
        description: `Receipt-${orderReceipt}`,
        image: "",
        order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          //here sending data to server to store and verify payment. -(Not yet completed)
          //send to server for verification- razorpay_payment_id,razorpay_order_id,razorpay_signature,orderId
          dispatch({
            type: "snackBar",
            payload: {
              type: "success",
              msg: "Payment verification in progress...",
            },
          });
  
          const paymentVerifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId,
          };
  
          const paymentVerificationResponse = await VerifyPaymentApi(
            paymentVerifyData
          );
          dispatch({ type: "stopLoading" });
          if (paymentVerificationResponse.data.type === "success") {
            dispatch({
              type: "snackBar",
              payload: {
                type: "success",
                msg: paymentVerificationResponse.data.msg,
              },
            });
  
            //need to clear cart,orderid,email and navigate to home or payment successful page
            dispatch({ type: "paymentSuccess" });
            navigate("/user/orders");
          } else {
            dispatch({
              type: "snackBar",
              payload: {
                type: "error",
                msg: paymentVerificationResponse.data.msg,
              },
            });
          }
        },
        prefill: {
          email: state.email,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzpObj = new window.Razorpay(options);
      rzpObj.open();
    };
  
    const submitHandler = () => {
      if (!state.email) {
        setState((prev) => ({ ...prev, emailHelperText: "Neccessary Field" }));
        return;
      }
      setState((prev) => ({ ...prev, emailHelperText: "" }));
  
      let pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const match = state.email.match(pattern);
  
      if (match) {
        //adding email to global state
        dispatch({ type: "addEmail", payload: { email: state.email } });
  
        let totalAmount =
          cart.length > 0
            ? cart
                .map((cartObj) => cartObj.price * cartObj.qtyNeeded)
                .reduce((acc, val) => acc + val)
            : "";
        setState((prev) => ({ ...prev, orderTotal: totalAmount }));
  
        //adding totalamount to global state
        dispatch({
          type: "updateOrderAmount",
          payload: { orderTotalAmount: state.orderTotal },
        });
  
        //calling this function below opens razorpay payment modal
        checkOutFunc();
      } else {
        setState((prev) => ({ ...prev, emailHelperText: "Provide Valid email" }));
      }
    };
  
    const cartRemoverFunc = (id) => {
      dispatch({
        type: "REMOVEFROMCART",
        payload: { id },
      });
    };
  
    const changeHandler = (ev) => {
      setState((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));
    };
  
    if (cart.length === 0) {
      return (
        <>
          <Container
            maxWidth="md"
            sx={{ p: { xs: 1, md: 5 }, my: 5, border: "4px solid #ec407a" }}
          >
            <Box sx={{ p: { md: 3 }, my: 4, color: "#ff4081" }}>
              <Typography variant="h5" sx={{ p: 2, my: 2 }} align="center">
                Empty cart
              </Typography>
              <Typography variant="h5" sx={{ p: 5, my: 5 }} align="center">
                Total Products in Cart : {cart.length}
              </Typography>
            </Box>
          </Container>
        </>
      );
    }
    return (
      <>
        <Container maxWidth="xl" sx={{ py: 1, my: 2 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={9} lg={5}>
              <Paper elevation={12} sx={{ my: 5 }}>
                {cart.length > 0 && (
                  <>
                    <TableContainer component={Box} sx={{ py: 2, my: 1 }}>
                      <Table aria-label="simple table">
                        <TableHead
                          sx={{ borderTop: "1px solid rgba(224, 224, 224, 1)" }}
                        >
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Qty</TableCell>
                            <TableCell align="right">Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {cart.map((cartObj) => (
                            <TableRow
                              key={cartObj.id}
                              sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {cartObj.name}
                              </TableCell>
                              <TableCell align="right">{cartObj.price}</TableCell>
                              <TableCell align="right">
                                {cartObj.qtyNeeded}
                              </TableCell>
                              <TableCell align="right">
                                ₹ {cartObj.price * cartObj.qtyNeeded}
                              </TableCell>
                            </TableRow>
                          ))}
  
                          <TableRow>
                            <TableCell
                              align="right"
                              sx={{ color: "#ff4081", fontWeight: "bold" }}
                            >
                              Total Amount
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell
                              align="right"
                              sx={{ color: "#ff4081", fontWeight: "bold" }}
                            >
                              {/* first get price and qtyNeeded, multiply and store as array then
                               use reduce to add them */}
                              ₹{" "}
                              {cart.length > 0 &&
                                cart
                                  .map(
                                    (cartObj) => cartObj.price * cartObj.qtyNeeded
                                  )
                                  .reduce((acc, val) => acc + val)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Typography variant="h6" align="right" sx={{ p: 3 }}>
                      Amount to Pay : ₹{" "}
                      {cart.length > 0 &&
                        cart
                          .map((cartObj) => cartObj.price * cartObj.qtyNeeded)
                          .reduce((acc, val) => acc + val)}
                      .00
                    </Typography>
                    {/*  userDetail */}
                    <Box sx={{ p: 3, "& .MuiTextField-root": { my: 1 } }}>
                      {/* collecting  email for razorPay prefill */}
                      <TextField
                        id="email"
                        label="Email"
                        fullWidth
                        required
                        name="email"
                        value={state.email}
                        onChange={(ev) => changeHandler(ev)}
                        helperText={
                          state.emailHelperText || "demo eg : karthee@karthee.com"
                        }
                        error={state.emailHelperText ? true : false}
                      />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        sx={{ my: 3, p: 3, background: "#ff4081" }}
                        onClick={() => submitHandler()}
                      >
                        Proceed to CheckOut
                      </Button>
                    </Box>
                  </>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={9} lg={7} sx={{ py: 2, my: 2 }}>
              <Typography variant="h5">
                Total Products in Cart : {cart.length}
              </Typography>
              {cart.length > 0 &&
                cart.map((cartObj) => (
                  <Card
                    sx={{
                      display: { md: "flex" },
                      my: 2,
                      width: "100%",
                      color: "#ff4081",
                    }}
                    key={cartObj.id}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: { md: 251 } }}
                      image={cartObj.imgUrl}
                      alt={cartObj.name}
                    />
  
                    <Stack sx={{ px: 3 }}>
                      <Tooltip title="View Product">
                        <Box
                          component={Link}
                          to={`/store/product/${cartObj.id}`}
                          sx={{ textDecoration: "none", color: "unset" }}
                        >
                          <CardContent>
                            <Typography variant="h5">{cartObj.name}</Typography>
                          </CardContent>
                          <CardContent>
                            <Typography variant="caption">
                              {cartObj.section} / {cartObj.category}
                            </Typography>
                          </CardContent>
                          <CardContent>
                            <Typography variant="h6">
                              Price : ₹{cartObj.price}.00
                            </Typography>
                          </CardContent>
                          <CardContent>
                            <Typography variant="body2">
                              {" "}
                              Qty : {cartObj.qtyNeeded}
                            </Typography>
                          </CardContent>
                        </Box>
                      </Tooltip>
                      <CardActions>
                        <Button
                          variant="contained"
                          sx={{ my: 2 }}
                          onClick={() => cartRemoverFunc(cartObj.id)}
                        >
                          Remove from Cart
                        </Button>
                      </CardActions>
                    </Stack>
                  </Card>
                ))}
            </Grid>
          </Grid>
        </Container>
        <SnackBars />
      </>
    );
  };
  
  export default Cart;