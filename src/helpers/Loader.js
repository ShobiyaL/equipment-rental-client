import React from "react";

import { Backdrop, CircularProgress } from "@mui/material";
import useStateValFunc from "../hooks/useStateValFunc";

const Loader = () => {
  const [{ loaderState }] = useStateValFunc();
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loaderState}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
    </>
  );
};

export default Loader;