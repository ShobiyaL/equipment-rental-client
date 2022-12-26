import { Alert, Slide, Snackbar } from "@mui/material";
import React from "react";
import useDispatchFunc from "../hooks/useDispatchFunc";
import useStateValFunc from "../hooks/useStateValFunc";

const SnackBars = () => {
  const [{ snackBarType, snackBarMsg }] = useStateValFunc();
  const dispatch = useDispatchFunc();

  const handleClose = () => {
    dispatch({
      type: "snackBar",
      payload: { msg: "" },
    });
  };

  function SlideTransition(props) {
    return <Slide {...props} direction="right" />;
  }

  return (
    <>
      <Snackbar
        open={Boolean(snackBarMsg)}
        onClose={() => handleClose()}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={() => handleClose()}
          severity={snackBarType}
          sx={{ width: "100%" }}
        >
          {snackBarMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackBars;