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
      username: "",
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
          username: state.username,
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
            payload: { message: response.data.message, type: "success" },
          });
          setState(initialValues);
        } else {
          dispatch({
            type: "snackBar",
            payload: { message: response.data.message, type: "error" },
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
            // background: "#CFD2CF",
            m: { xs: 0, md: 0 },
            my: { xs: 0, sm: 0 },
            py: { xs: 2, md: 0 },
            
            alignItems: { md: "center" },
          }}
        >
          <Grid
            item
            sx={{
              p: { xs: 0, md: 3 },
              m: { xs: 0, md: 1 },
            }}
            xs={10}
            md={8}
          >
           
            <Box
              sx={{
                p: { xs: 0, lg: 2 },
                my: 0,
                border: "1px solid ",
                display: "block",
                textDecoration: "none",
                color: "inherit",
              }}
              component={Link}
              to="/"
            >
              <Typography align="center" >
                Check All our Product Listings
              </Typography>
            </Box>
           
          </Grid>
        </Grid>
        <Box
          sx={{
            py: 2,
            my: 0,
            "& .MuiTextField-root": {
              my: 2,
              width: { xs: "30ch", sm: "35ch", md: "40ch" },
            },
          }}
        >
          <Container
            maxWidth="xs"
            sx={{ py: 2, my: 2, border: "2px solid " }}
          >
            {/* contactUs- Name,Email,PhoneNo,ProductEnquiry */}
            <Typography variant="h6" >
              Leave us Your Message :
            </Typography>
            <TextField
              id="name"
              label="Name"
              variant="standard"
              fullWidth
              name="username"
              value={state.username}
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
                sx={{ background: "#23A39F", my: 1 }}
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