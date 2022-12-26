import React, { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const OrderTableBody = ({ row }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <>
        <TableRow
          sx={{
            "& > *": {
              borderBottom: "unset",
              background: `${open ? "#f48fb1" : ""}`,
            },
          }}
        >
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.email}
          </TableCell>
          <TableCell align="right">{row.orderIdGenerated}</TableCell>
          <TableCell align="right">
            {row.isPaymentSuccess ? "Success" : "Pending/Failed"}
          </TableCell>
          <TableCell align="right">₹{row.orderAmount}.00</TableCell>
          <TableCell align="right">
            {/* getting date */}
            {row.createdAt.split("T")[0].split("-").reverse().join("-")}
          </TableCell>
        </TableRow>
        <TableRow sx={{ background: `${open ? "#f8bbd0" : ""}` }}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Cart
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold", color: "#ff4081" }}>
                        Product Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#ff4081" }}>
                        Section
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#ff4081" }}>
                        Category
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontWeight: "bold", color: "#ff4081" }}
                      >
                        Price
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontWeight: "bold", color: "#ff4081" }}
                      >
                        Rented Qty
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.cart.map((cartObj) => (
                      <TableRow key={cartObj.id}>
                        <TableCell component="th" scope="row">
                          {cartObj.name}
                        </TableCell>
                        <TableCell>{cartObj.section}</TableCell>
                        <TableCell>{cartObj.category}</TableCell>
                        <TableCell component="th" scope="row" align="right">
                          {cartObj.price}
                        </TableCell>
                        <TableCell align="right">{cartObj.qtyNeeded}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    </>
  );
};

export default OrderTableBody;