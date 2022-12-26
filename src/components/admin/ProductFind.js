import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
  } from "@mui/material";
  import React, { useState, useEffect } from "react";
  import useDispatchFunc from "../../hooks/useDispatchFunc";
  import useStateValFunc from "../../hooks/useStateValFunc";
  
  import { sectionArray, categoryArray } from "../../helpers/ProductCreateHelper";
  import SearchCategoryProductApi from "../../apis/admin/productCrud/SearchCategoryProductApi";
  import { useNavigate } from "react-router-dom";
  
  const ProductFind = () => {
    const initialValue = {
      section: "",
      category: "",
    };
    const [state, setState] = useState(initialValue);
    const [categoryState, setCategoryState] = useState(undefined);
    const [sectionStateArray, setSectionStateArray] = useState(null);
  
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
      setState((prevState) => ({
        ...prevState,
        [ev.target.name]: ev.target.value,
      }));
      if (ev.target.name === "section") {
        setState((prevState) => ({
          ...prevState,
          category: "",
        }));
      }
    };
  
    const onSubmitHandler = async () => {
      const { category } = state;
      dispatch({ type: "startLoading" });
      const categoryValue = { categoryValue: category };
      const response = await SearchCategoryProductApi(categoryValue, token);
      dispatch({ type: "stopLoading" });
      if (response.data.type === "success") {
        dispatch({
          type: "snackBar",
          payload: { msg: response.data.msg, type: "success" },
        });
        setSectionStateArray(response.data.productFound);
      } else {
        dispatch({
          type: "snackBar",
          payload: { msg: response.data.msg, type: "error" },
        });
        setState(initialValue);
      }
      // create api to search for product based on section and category
    };
    return (
      <>
        {" "}
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
              Find Product
            </Typography>
            <Grid container sx={{ justifyContent: "center", my: 2 }}>
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
              <Grid item xs={10} md={8}>
                <Button
                  variant="contained"
                  sx={{ background: "#ff4081", my: 1 }}
                  onClick={() => onSubmitHandler()}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
            {/* here cards */}
            {sectionStateArray && (
              <Grid
                container
                spacing={2}
                sx={{ justifyContent: "center", my: 2, pb: 2 }}
              >
                {sectionStateArray.map(({ name, url, _id }) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={_id}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardContent>
                        <Typography variant="body1">{name}</Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        height="140"
                        sx={{ objectFit: "contain" }}
                        image={url}
                        alt={`${name}`}
                      />
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() =>
                            navigate(`/admin/crud/productGetOne/${_id}`)
                          }
                        >
                          View
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Box>{" "}
      </>
    );
  };
  
  export default ProductFind;