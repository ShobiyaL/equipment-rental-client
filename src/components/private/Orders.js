import { Box, Chip, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GetOrdersApi from "../../apis/private/GetOrdersApi";
import useDispatchFunc from "../../hooks/useDispatchFunc";
import useStateValFunc from "../../hooks/useStateValFunc";
import OrdersDisplayCard from "../public/OrdersDisplayCard";

const Orders = () => {
  const [state, setState] = useState({ ordersFound: "", notFoundFlag: false });
  const dispatch = useDispatchFunc();
  const [{ token }] = useStateValFunc();

  useEffect(() => {
    (async () => {
      dispatch({ type: "startLoading" });
      const response = await GetOrdersApi(token);
      dispatch({ type: "stopLoading" });

      if (response.data.type === "success") {
        setState((prev) => ({
          ...prev,
          ordersFound: response.data.ordersFound,
        }));
        dispatch({
          type: "snackBar",
          payload: { msg: response.data.msg, type: "success" },
        });
      } else {
        setState((prev) => ({ ...prev, notFoundFlag: true }));
        dispatch({
          type: "snackBar",
          payload: { msg: response.data.msg, type: "error" },
        });
      }
    })();
  }, [dispatch, token]);

  if (state.notFoundFlag) {
    return (
      <>
        <Container
          maxWidth="md"
          sx={{ p: { xs: 1, md: 5 }, my: 5, border: "4px solid #ec407a" }}
        >
          <Box sx={{ p: { md: 3 }, my: 4, color: "#ff4081" }}>
            <Typography variant="h5" sx={{ p: 5, my: 5 }}>
              No Orders Found.
            </Typography>
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container maxWidth="md" sx={{ p: { xs: 1, md: 3 }, my: 2 }}>
        <Box>
          <Typography variant="h4" align="center">
            Order Page
          </Typography>
        </Box>
        {state.ordersFound.length > 0 &&
          state.ordersFound.map((orderObj) => {
            return (
              <Box sx={{ p: 2, my: 5, border: "4px solid #ec407a" }}>
                <Box sx={{ color: "#ff4081", py: 1 }}>
                  <Typography variant="h6">
                    Order ID : {orderObj.orderIdGenerated}
                  </Typography>
                  <Typography variant="h6">
                    Order Total : ₹ {orderObj.orderAmount}.00
                  </Typography>
                  <Typography variant="h6">
                    Payment Status :{" "}
                    {orderObj.isPaymentSuccess ? (
                      <>
                        <Chip label="Success" color="success" />
                      </>
                    ) : (
                      <>
                        <Chip label="Failure" color="error" />
                      </>
                    )}
                  </Typography>
                </Box>
                {/* below will display all products rented (i.e cart-Items) */}
                {orderObj.cart.map((cartItem) => (
                  <OrdersDisplayCard cartObj={cartItem} />
                ))}
              </Box>
            );
          })}
      </Container>
    </>
  );
};

export default Orders;