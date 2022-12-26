import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Stack,
    Tooltip,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { Link } from "react-router-dom";
  
  const OrdersDisplayCard = ({ cartObj }) => {
    return (
      <>
        <Card
          sx={{
            display: { md: "flex" },
            my: { xs: 2, md: 3 },
            width: "100%",
            color: "#ff4081",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: { md: 281 } }}
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
                    Qty Rented : {cartObj.qtyNeeded}
                  </Typography>
                </CardContent>
              </Box>
            </Tooltip>
          </Stack>
        </Card>
      </>
    );
  };
  
  export default OrdersDisplayCard;