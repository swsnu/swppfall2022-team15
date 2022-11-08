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
import { createMessage } from "../../services/message";
import { fetchMessages } from "../../store/slices/message";
import { AppDispatch } from "../../store";

interface IProps {
  open: any;
  handleClose: any;
}

export default function MessageCreateModal(props: IProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleClickConfirm = async () => {
    if (title && content) {
      await createMessage(title, content);
      props.handleClose();
      await dispatch(fetchMessages());
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
        <DialogTitle>New Message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            required
          />
          <InputLabel id="demo-simple-select-label">Title</InputLabel>

          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="content"
            type="text"
            fullWidth
            variant="standard"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
            required
          />
          <InputLabel id="demo-simple-select-label">Content</InputLabel>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
