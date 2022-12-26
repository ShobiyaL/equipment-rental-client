import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  
  import LoginIcon from "@mui/icons-material/Login";
  
  import SignInApi from "../../apis/SignInApi";
  import useDispatchFunc from "../../hooks/useDispatchFunc";
  import { useNavigate } from "react-router-dom";
  import useUserValidations from "../../hooks/useUserValidations";
  
  const SignIn = () => {
    const [state, setState] = useState({
      email: "",
      password: "",
    });
  
    const [helper, setHelper] = useState({ email: "", password: "" });
  
    const dispatch = useDispatchFunc();
    const navigate = useNavigate();
    const [checkAuth] = useUserValidations();
  
    useEffect(() => {
      if (checkAuth()) {
        navigate("/shop");
      }
    }, [checkAuth, navigate]);
  
    const onChangeHandler = (ev) => {
      setState((prevState) => ({
        ...prevState,
        [ev.target.name]: ev.target.value,
      }));
    };
  
    const onSubmitHandler = async () => {
      state.email
        ? setHelper((prev) => ({ ...prev, email: "" }))
        : setHelper((prev) => ({ ...prev, email: "Necessary Field" }));
  
      state.password
        ? setHelper((prev) => ({ ...prev, password: "" }))
        : setHelper((prev) => ({ ...prev, password: "Necessary Field" }));
  
      if (state.email && state.password) {
        const body = {
          email: state.email,
          password: state.password,
        };
        dispatch({ type: "startLoading" });
        const response = await SignInApi(body);
        dispatch({
          type: "signin",
          payload: { token: response.data.token, role: response.data.role },
        });
        dispatch({ type: "stopLoading" });
        if (response.data.type === "success") {
          dispatch({
            type: "snackBar",
            payload: { msg: response.data.msg, type: "success" },
          });
          navigate("/store");
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
        <Box
          sx={{
            py: 2,
            my: 3,
            "& .MuiTextField-root": {
              my: 2,
            },
          }}
        >
          <Container
            maxWidth="sm"
            sx={{ py: 2, my: 2, border: "4px solid pink" }}
          >
            <Typography variant="h6" sx={{ color: "#ff4081" }} align="center">
              SignIn
            </Typography>
            <Grid container sx={{ justifyContent: "center" }}>
              <Grid item xs={10} md={8}>
                <TextField
                  id="email"
                  label="Email"
                  fullWidth
                  required
                  name="email"
                  value={state.email}
                  onChange={(ev) => onChangeHandler(ev)}
                  helperText={helper.email}
                  error={helper.email ? true : false}
                />
              </Grid>
              <Grid item xs={10} md={8}>
                <TextField
                  id="password"
                  label="Password"
                  fullWidth
                  required
                  name="password"
                  type="password"
                  value={state.password}
                  onChange={(ev) => onChangeHandler(ev)}
                  helperText={helper.password}
                  error={helper.password ? true : false}
                />
              </Grid>
              <Grid item xs={10} md={8}>
                <Button
                  variant="contained"
                  sx={{ background: "#ff4081", my: 1 }}
                  endIcon={<LoginIcon />}
                  onClick={() => onSubmitHandler()}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  };
  
  export default SignIn;