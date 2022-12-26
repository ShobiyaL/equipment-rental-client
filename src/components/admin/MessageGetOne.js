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
  
  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  
  import GetOneMsgApi from "../../apis/admin/message/GetSingleMsgApi";
  import useDispatchFunc from "../../hooks/useDispatchFunc";
  import useStateValFunc from "../../hooks/useStateValFunc";
  
  import ReplyIcon from "@mui/icons-material/Reply";
  import EmailSendComponent from "./EmailSendComponent";
  
  const MessageGetOne = () => {
    const [state, setState] = useState();
    const [openDialogState, setOpenDialogState] = useState(false);
  
    const dispatch = useDispatchFunc();
    const params = useParams();
    const id = params.id;
    const [{ token }] = useStateValFunc();
  
    useEffect(() => {
      (async () => {
        dispatch({ type: "startLoading" });
        const response = await GetOneMsgApi(id, token);
        dispatch({ type: "stopLoading" });
  
        if (response.data.type === "success") {
          dispatch({
            type: "snackBar",
            payload: { type: "success", msg: response.data.msg },
          });
          setState([response.data.msgFound]);
        } else {
          dispatch({
            type: "snackBar",
            payload: { type: "error", msg: response.data.msg },
          });
        }
      })();
    }, [dispatch, id, token]);
  
    const DialogToggler = () => {
      setOpenDialogState((prev) => !prev);
    };
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
                  expanded
                >
                  <AccordionSummary aria-controls="panel1a-content" id={item._id}>
                    <Stack direction="row">
                      <Typography sx={{ mr: 5, textDecoration: "underline" }}>
                        Message-Overview
                      </Typography>
                      <Typography sx={{ ml: 5, align: "end" }}>
                        Date :{" "}
                        {item.createdAt ? item.createdAt.split("T")[0] : "-"}
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack>
                      <Typography variant="h6" sx={{ mr: 4 }}>
                        Sender Name:
                      </Typography>
                      <Typography variant="body1" sx={{ me: 4 }}>
                        {item.name ? item.name : "NA"}
                      </Typography>
                    </Stack>
  
                    <Divider sx={{ my: 2 }} />
  
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
                      <Typography variant="h6" sx={{ mr: 4 }}>
                        Sender Phone:
                      </Typography>
                      <Typography variant="body1" sx={{ me: 4 }}>
                        {item.phoneNo ? item.phoneNo : "NA"}
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
                      endIcon={<ReplyIcon />}
                      onClick={() => DialogToggler()}
                    >
                      Click to Reply
                    </Button>
                  </AccordionDetails>
                </Accordion>
              ))}
            <Box>
              <EmailSendComponent
                openDialogState={openDialogState}
                DialogToggler={DialogToggler}
                recipientEmail={state ? state[0].email : ""}
              />
            </Box>
          </Container>
        </Box>
      </>
    );
  };
  
  export default MessageGetOne;