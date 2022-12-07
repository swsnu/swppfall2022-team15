import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMessages } from "../../store/slices/message";
import { AppDispatch } from "../../store";
import { fetchProjects } from "../../store/slices/project";
import { EnumNotificationType } from "../../Enums";
import { messageCreateService } from "./utils/MessageRequestService";
import MessageCreateForm from "./MessageForm";

interface IProps {
  open: any;
  handleClose: any;
}

export default function MessageCreateModal(props: IProps) {
  const [notificationType, setNotificationType] = useState("");
  const [name, setName] = useState("");
  const [content, setContent]: [any, any] = useState({});
  const [fieldErrors, setFieldErrors]: [any, any] = useState({});

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const clearForm = () => {
    setName("");
    setContent({});
  };

  const handleClickConfirm = async () => {
    if (notificationType && name && content) {
      const errorField = await messageCreateService(
        notificationType,
        name,
        content,
        fieldErrors
      );
      if (errorField) {
        setFieldErrors(errorField);
      }
      props.handleClose();
      clearForm();
      dispatch(fetchMessages());
    }
  };

  const form = MessageCreateForm({
    notificationType,
    name,
    setName,
    data: content,
    setData: setContent,
    fieldErrors,
    setFieldErrors,
  });

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
          <InputLabel id="demo-simple-select-label">
            Notification Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={notificationType}
            inputProps={{
              "data-testid": "type-input",
            }}
            onChange={(event: SelectChangeEvent) => {
              setNotificationType(event.target.value as string);
            }}
            fullWidth
          >
            <MenuItem value={EnumNotificationType.SLACK}>SLACK</MenuItem>
            <MenuItem value={EnumNotificationType.EMAIL}>EMAIL</MenuItem>
            <MenuItem value={EnumNotificationType.WEBHOOK}>WEBHOOK</MenuItem>
            <MenuItem value={EnumNotificationType.SMS}>SMS</MenuItem>
          </Select>
          <br />
          <br />
          {form}
        </DialogContent>
        <DialogActions>
          <Button data-testid="create-button" onClick={handleClickConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
