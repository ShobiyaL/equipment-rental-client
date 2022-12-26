import { Box, Button, Container, Stack } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const ProductMainPage = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: "sm",
            ml: "auto",
            "& .MuiButton-root": { p: 1, m: 2 },
          }}
        >
          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{ background: "#ff4081", my: 1 }}
              component={Link}
              to="/admin/crud/productCreate"
            >
              Create Product
            </Button>
            <Button
              variant="contained"
              sx={{ background: "#ff4081", my: 1 }}
              component={Link}
              to="/admin/crud/productGetAll"
            >
              Product Listing
            </Button>
            <Button
              variant="contained"
              sx={{ background: "#ff4081", my: 1 }}
              component={Link}
              to="/admin/crud/productFind"
            >
              Find Product
            </Button>
          </Stack>
        </Box>

        <>
          <Outlet />
        </>
      </Container>
    </>
  );
};

export default ProductMainPage;