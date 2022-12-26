import { Box, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import GetAllProductsApi from "../../apis/admin/productCrud/GetAllProductsApi";
import useStateValFunc from "../../hooks/useStateValFunc";
import useDispatchFunc from "../../hooks/useDispatchFunc";

const ProductGetAll = () => {
  const [state, setState] = useState();
  const [{ token }] = useStateValFunc();
  const dispatch = useDispatchFunc();

  useEffect(() => {
    dispatch({ type: "startLoading" });
    (async () => {
      const response = await GetAllProductsApi(token);
      dispatch({ type: "stopLoading" });
      if (response.data.type === "success") {
        setState(
          response.data.productFound.map(
            ({ _id, name, desc, qty, section, category }) => ({
              id: _id,
              name,
              desc,
              qty,
              section,
              category,
            })
          )
        );

        dispatch({
          type: "snackBar",
          payload: { type: "success", msg: response.data.msg },
        });
      } else {
        dispatch({
          type: "snackBar",
          payload: { type: "error", msg: response.data.msg },
        });
      }
    })();
  }, [dispatch, token]);

  const productColumns = [
    {
      field: "name",
      headerName: "Name",
      width: 220,
    },
    {
      field: "desc",
      headerName: "Description",
      width: 260,
    },
    {
      field: "section",
      headerName: "Section",
      width: 220,
    },
    {
      field: "category",
      headerName: "Category",
      width: 220,
    },
    {
      field: "qty",
      headerName: "In Stock",
      width: 130,
    },
  ];

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
          maxWidth="lg"
          sx={{ py: 2, my: 2, border: "4px solid pink" }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#ff4081", py: 1 }}
            align="center"
          >
            Products Listing
          </Typography>
          {state && (
            <Box
              sx={{
                "& .MuiDataGrid-root": {
                  borderColor: "#ff4081",
                  border: "1px solid #ad1457",
                },
                "& .MuiDataGrid-cell": {
                  borderColor: "#ff4081",
                  border: "1px solid pink",
                },
                "& .MuiDataGrid-columnHeaders": {
                  borderColor: "#ff4081",
                },
                "& .MuiDataGrid-columnSeparator": {
                  color: "#ff4081",
                },
              }}
            >
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={state}
                  columns={productColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  sx={{
                    borderColor: "#ff4081",
                  }}
                />
              </div>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default ProductGetAll;