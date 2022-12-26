import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import OrderTableBody from "./OrderTableBody";
import GetAllOrdersApi from "../../../apis/admin/orderMgmt/GetAllOrdersApi";
import useStateValFunc from "../../../hooks/useStateValFunc";
import useDispatchFunc from "../../../hooks/useDispatchFunc";

const OrderTable = () => {
  const [orderState, setOrderState] = useState("");
  const [{ token }] = useStateValFunc();
  const dispatch = useDispatchFunc();

  useEffect(() => {
    (async () => {
      dispatch({ type: "startLoading" });
      const response = await GetAllOrdersApi(token);
      dispatch({ type: "stopLoading" });
      if (response.data.type === "success") {
        dispatch({
          type: "snackBar",
          payload: { type: "success", msg: response.data.msg },
        });
        setOrderState(response.data.ordersFound);
      } else {
        dispatch({
          type: "snackBar",
          payload: { type: "error", msg: response.data.msg },
        });
      }
    })();
  }, [dispatch, token]);

  return (
    <>
      <Box sx={{ p: { md: 2 }, my: 2 }}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell sx={{ fontWeight: "bold", color: "#ff4081" }}>
                  Customer Email
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", color: "#ff4081" }}
                >
                  Order ID
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", color: "#ff4081" }}
                >
                  Payment Status
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", color: "#ff4081" }}
                >
                  Order Amount
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", color: "#ff4081" }}
                >
                  Created At
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderState.length > 0 &&
                orderState.map((orderObj) => (
                  <OrderTableBody key={orderObj._id} row={orderObj} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default OrderTable;