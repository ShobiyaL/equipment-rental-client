import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  
  import SendRoundedIcon from "@mui/icons-material/SendRounded";
  
  import ContactFormApi from "../../apis/ContactFormApi";
  
  import useDispatchFunc from "../../hooks/useDispatchFunc";
  
  const ReachUs = () => {
    const initialValues = {
      name: "",
      email: "",
      phone: "",
      query: "",
      helperEmail: "",
      helperQuery: "",
    };
    const [state, setState] = useState(initialValues);
    const dispatch = useDispatchFunc();
  
    const onChangeHandler = (ev) => {
      setState((prevState) => ({
        ...prevState,
        [ev.target.name]: ev.target.value,
      }));
    };
  
    const onSubmit = async () => {
      state.email
        ? setState((prevState) => ({
            ...prevState,
            helperEmail: "",
          }))
        : setState((prevState) => ({
            ...prevState,
            helperEmail: "Email necessary",
          }));
  
      state.query
        ? setState((prevState) => ({
            ...prevState,
            helperQuery: "",
          }))
        : setState((prevState) => ({
            ...prevState,
            helperQuery: "Your message here",
          }));
  
      if (state.email && state.query) {
        const body = {
          name: state.name,
          email: state.email,
          phoneNo: state.phone,
          query: state.query,
        };
        dispatch({ type: "startLoading" });
        const response = await ContactFormApi(body);
        dispatch({ type: "stopLoading" });
        if (response.data.type === "success") {
          dispatch({
            type: "snackBar",
            payload: { msg: response.data.msg, type: "success" },
          });
          setState(initialValues);
        } else {
          dispatch({
            type: "snackBar",
            payload: { msg: response.data.msg, type: "error" },
          });
        }
      }
    };
  
    return (
      <>
        <Grid
          container
          sx={{
            justifyContent: "center",
            background: "#ad1457",
            m: { xs: 0, md: 0 },
            my: { xs: 0, sm: 0 },
            py: { xs: 4, md: 0 },
            height: "30rem",
            alignItems: { md: "center" },
          }}
        >
          <Grid
            item
            sx={{
              p: { xs: 0, md: 3 },
              m: { xs: 0, md: 1 },
              color: "#fce4ec",
            }}
            xs={10}
            md={8}
          >
            <Typography variant="h6">
              EquipRents is One-Stop Shop where You can Rent Equipments Online.
              Our Product Listings are huge{" "}
              <Box sx={{ color: "#f48fb1", fontSize: "1rem" }} component="span">
                (325+ products in 12 sections and different categories)
              </Box>
              , You should definitely check it out. You can Rent Equipments and
              make Payment Online via RazorPay Payment Gateway
            </Typography>
            <Box
              sx={{
                p: { xs: 0, lg: 2 },
                my: 2,
                border: "1px solid #fce4ec",
                display: "block",
                textDecoration: "none",
                color: "inherit",
              }}
              component={Link}
              to="/"
            >
              <Typography align="center" sx={{ p: 2 }}>
                Check All our Product Listings
              </Typography>
            </Box>
            <Paper
              sx={{
                color: "#ff4081",
                background: "inherit",
                textDecoration: "overline",
                m: { sm: 4 },
              }}
              elevation={0}
            >
              EquipRents - Dont Buy when You can Rent
            </Paper>
          </Grid>
        </Grid>
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
            maxWidth="xs"
            sx={{ py: 2, my: 2, border: "4px solid pink" }}
          >
            {/* contactUs- Name,Email,PhoneNo,ProductEnquiry */}
            <Typography variant="h6" sx={{ color: "#ff4081" }}>
              Leave us Your Message :
            </Typography>
            <TextField
              id="name"
              label="Name"
              variant="standard"
              fullWidth
              name="name"
              value={state.name}
              onChange={(ev) => onChangeHandler(ev)}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="standard"
              fullWidth
              required
              name="email"
              value={state.email}
              onChange={(ev) => onChangeHandler(ev)}
              helperText={state.helperEmail}
              error={state.helperEmail ? true : false}
            />
            <TextField
              id="phoneNo"
              label="PhoneNo"
              variant="standard"
              fullWidth
              name="phone"
              value={state.phone}
              onChange={(ev) => onChangeHandler(ev)}
            />
            <TextField
              id="query"
              label="Please ask your queries here"
              multiline
              rows={10}
              sx={{ my: "3rem", width: { xs: "30ch", sm: "35ch", md: "40ch" } }}
              required
              name="query"
              value={state.query}
              onChange={(ev) => onChangeHandler(ev)}
              helperText={state.helperQuery || ""}
              error={state.helperQuery ? true : false}
            />
            <Box>
              <Button
                variant="contained"
                sx={{ background: "#ff4081", my: 1 }}
                endIcon={<SendRoundedIcon />}
                onClick={() => onSubmit()}
              >
                Send Message
              </Button>
            </Box>
          </Container>
        </Box>
      </>
    );
  };
  
  export default ReachUs;