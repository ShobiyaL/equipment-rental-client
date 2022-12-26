import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
  } from "@mui/material";
  import React, { useState } from "react";
  
  import SendIcon from "@mui/icons-material/Send";
  import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
  import SendEmailApi from "../../apis/admin/message/SendEmailApi";
  import useStateValFunc from "../../hooks/useStateValFunc";
  import useDispatchFunc from "../../hooks/useDispatchFunc";
  
  const EmailSendComponent = ({
    openDialogState,
    DialogToggler,
    recipientEmail,
  }) => {
    const [state, setState] = useState("");
  
    const [{ token }] = useStateValFunc();
    const dispatch = useDispatchFunc();
  
    const handleClose = () => {
      DialogToggler();
    };
  
    const handleSubmit = async () => {
      dispatch({ type: "startLoading" });
      const data = { mailContent: state, recipientEmail };
      const response = await SendEmailApi(data, token);
  
      dispatch({ type: "stopLoading" });
      if (response.data.type === "success") {
        dispatch({
          type: "snackBar",
          payload: { type: "success", msg: response.data.msg },
        });
      } else {
        dispatch({
          type: "snackBar",
          payload: { type: "error", msg: response.data.msg },
        });
      }
      DialogToggler();
    };
  
    return (
      <>
        <Dialog open={openDialogState} onClose={handleClose}>
          <DialogTitle>Message Reply</DialogTitle>
          <DialogContent>
            <DialogContentText>From : EquipRents (admin),</DialogContentText>
            <DialogContentText>
              To : {recipientEmail ? recipientEmail : "NA"}
            </DialogContentText>
            <TextField
              id="query"
              label="Reply to query"
              multiline
              rows={10}
              sx={{
                my: "3rem",
                width: "35ch",
              }}
              required
              name="query"
              value={state}
              onChange={(ev) => setState(ev.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ mb: 1 }}>
            <Button
              onClick={() => handleClose()}
              variant="contained"
              endIcon={<CancelScheduleSendIcon />}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleSubmit()}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  
  export default EmailSendComponent;