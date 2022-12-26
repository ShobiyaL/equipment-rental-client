import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GetProfileApi from "../../apis/private/GetProfileApi";
import useDispatchFunc from "../../hooks/useDispatchFunc";
import useStateValFunc from "../../hooks/useStateValFunc";

const Profile = () => {
  const dispatch = useDispatchFunc();
  const [state, setState] = useState({ name: "", email: "", notFound: false });
  const [{ token }] = useStateValFunc();

  useEffect(() => {
    (async () => {
      dispatch({ type: "startLoading" });
      const response = await GetProfileApi(token);
      dispatch({ type: "stopLoading" });
      if (response.data.type === "success") {
        setState((prev) => ({
          ...prev,
          name: response.data.userFound.name,
          email: response.data.userFound.email,
        }));
        dispatch({
          type: "snackBar",
          payload: { msg: response.data.msg, type: "success" },
        });
      } else {
        setState((prev) => ({
          ...prev,
          notFound: true,
        }));
        dispatch({
          type: "snackBar",
          payload: { msg: response.data.msg, type: "error" },
        });
      }
    })();
  }, [dispatch, token]);

  if (state.notFound) {
    return (
      <>
        <Box sx={{ p: { md: 3 }, my: 4, color: "#ff4081" }}>
          <Typography variant="h5" sx={{ p: 5, my: 5 }}>
            User not Found
          </Typography>
        </Box>
      </>
    );
  }
  return (
    <>
      <>
        <Container
          maxWidth="md"
          sx={{ p: { xs: 1, md: 5 }, my: 5, border: "4px solid #ec407a" }}
        >
          <Box sx={{ p: { md: 3 }, my: 4, color: "#ff4081" }}>
            <Typography variant="h4">Name - {state.name}</Typography>
          </Box>
          <Box sx={{ p: { md: 3 }, my: 4, color: "#ff4081" }}>
            <Typography variant="h4">Email - {state.email}</Typography>
          </Box>
        </Container>
      </>
    </>
  );
};

export default Profile;