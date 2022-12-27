import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GetProfileApi from "../../apis/private/GetProfileApi";
import useDispatchFunc from "../../hooks/useDispatchFunc";
import useStateValFunc from "../../hooks/useStateValFunc";

const Profile = () => {
  const dispatch = useDispatchFunc();
  const [state, setState] = useState({ username: "", email: "", notFound: false });
  const [ {token} ] = useStateValFunc();
  
  useEffect(() => {
    (async () => {
      dispatch({ type: "startLoading" });
      const response = await GetProfileApi(token);
       console.log(response.data);
      dispatch({ type: "stopLoading" }); 
      if (response.data.type === "success") {
        setState((prev) => ({
          ...prev,
          username: response.data.userFound.username,
          email: response.data.userFound.email,
        }));
        dispatch({
          type: "snackBar",
          payload: { message: response.data.message, type: "success" },
        });
      } else {
        setState((prev) => ({
          ...prev,
          notFound: true,
        }));
        dispatch({
          type: "snackBar",
          payload: { message: response.data.message, type: "error" },
        });
      }
    })();
  }, [dispatch, token]);

  if (state.notFound) {
    return (
      <>
        <Box sx={{ p: { md: 3 }, my: 4,  }}>
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
          sx={{ p: { xs: 1, md: 5 }, my: 5, border: "2px solid " }}
        >
          <Box sx={{ p: { md: 3 }, my: 4,  }}>
            <Typography variant="h4">Name - {state.username}</Typography>
          </Box>
          <Box sx={{ p: { md: 3 }, my: 4 }}>
            <Typography variant="h4">Email - {state.email}</Typography>
          </Box>
        </Container>
      </>
    </>
  );
};

export default Profile;