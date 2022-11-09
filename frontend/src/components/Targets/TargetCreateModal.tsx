import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {createTarget, fetchTargets} from "../../store/slices/target";

interface IProps {
  open: any;
  handleClose: any;
}

export default function TargetCreateModal(props: IProps) {
  const [targetName, setTargetName] = useState("");
  const [messageType, setMessageType] = useState("");
  const [endPoint, setEndPoint] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const handleClickConfirm = async () => {
    if (targetName && messageType && endPoint) {
      const data = {
        name: targetName,
        notification_type: messageType,
        endpoint: endPoint,
        data: {},
        project: 1,
      }
      dispatch(createTarget(data));
      props.handleClose();
      await dispatch(fetchTargets());
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        fullWidth
      >
        <DialogTitle>New Target</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="target_name"
            label="target name"
            type="text"
            fullWidth
            variant="standard"
            value={targetName}
            onChange={(event) => {
              setTargetName(event.target.value);
            }}
            required
          />
          <InputLabel id="demo-simple-select-label">Target Name</InputLabel>

          <TextField
            autoFocus
            margin="dense"
            id="message_type"
            label="message name"
            type="text"
            fullWidth
            variant="standard"
            value={messageType}
            onChange={(event) => {
              setMessageType(event.target.value);
            }}
            required
          />
          <InputLabel id="demo-simple-select-label">Message Type</InputLabel>

          <TextField
            autoFocus
            margin="dense"
            id="end_point"
            label="end point"
            type="text"
            fullWidth
            variant="standard"
            value={endPoint}
            onChange={(event) => {
              setEndPoint(event.target.value);
            }}
            required
          />
          <InputLabel id="demo-simple-select-label">End Point</InputLabel>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
