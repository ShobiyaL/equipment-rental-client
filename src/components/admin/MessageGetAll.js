import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Container,
    Divider,
    Stack,
    Typography,
  } from "@mui/material";
  import React, { useState, useEffect } from "react";
  
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import GetAllMsgApi from "../../apis/admin/message/GetAllMsgApi";
  import useDispatchFunc from "../../hooks/useDispatchFunc";
  import { useNavigate } from "react-router-dom";
  import useStateValFunc from "../../hooks/useStateValFunc";
  
  const MessageGetAll = () => {
    const [state, setState] = useState();
    const dispatch = useDispatchFunc();
    const navigate = useNavigate();
    const [{ token }] = useStateValFunc();
  
    useEffect(() => {
      (async () => {
        dispatch({ type: "startLoading" });
        const response = await GetAllMsgApi(token);
        dispatch({ type: "stopLoading" });
  
        if (response.data.type === "success") {
          dispatch({
            type: "snackBar",
            payload: { type: "success", msg: response.data.msg },
          });
          setState(response.data.allMsgs);
        } else {
          dispatch({
            type: "snackBar",
            payload: { type: "error", msg: response.data.msg },
          });
        }
      })();
    }, [dispatch, token]);
  
    return (
      <>
        <Box
          sx={{
            py: 2,
            my: 3,
          }}
        >
          <Container
            maxWidth="md"
            sx={{ py: 2, my: 2, border: "4px solid pink" }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#ff4081", py: 1 }}
              align="center"
            >
              Message Inbox
            </Typography>
  
            {state &&
              state.map((item, i) => (
                <Accordion
                  sx={{ backgroundColor: "#f8bbd0", color: "#c51162" }}
                  key={item._id}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={item._id}
                  >
                    <Stack direction="row">
                      <Typography>Message : {i + 1}</Typography>
                      <Typography sx={{ ml: 4 }}>
                        Date :{" "}
                        {item.createdAt ? item.createdAt.split("T")[0] : ""}
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack>
                      <Typography variant="h6" sx={{ mr: 4 }}>
                        Sender Email:
                      </Typography>
                      <Typography variant="body1" sx={{ me: 4 }}>
                        {item.email}
                      </Typography>
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <Stack>
                      <Typography variant="h6">Query:</Typography>
                      <Typography variant="body1">{item.query}</Typography>
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <Button
                      variant="contained"
                      sx={{ mx: "auto", my: 2 }}
                      onClick={() => navigate(`/admin/msgOne/${item._id}`)}
                    >
                      Click to view
                    </Button>
                  </AccordionDetails>
                </Accordion>
              ))}
          </Container>
        </Box>
      </>
    );
  };
  
  export default MessageGetAll;