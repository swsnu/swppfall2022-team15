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
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {fetchMessages} from "../../store/slices/message";
import {AppDispatch} from "../../store";
import {fetchProjects} from "../../store/slices/project";
import {EnumNotificationType} from "../../Enums";
import {createMessage2} from "../../services/message";
import MessageCreateForm from "./MessageCreateForm";

interface IProps {
  open: any;
  handleClose: any;
}

export default function MessageCreateModal(props: IProps) {
  const [notificationType, setNotificationtype] = useState("");
  const [content, setContent]: [any, any] = useState({});
  const [fieldErrors, setFieldErrors]: [any, any] = useState({});

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const clearForm = () => {
    setContent({});
  };

  const handleClickConfirm = async () => {
    if (notificationType) {
      switch (notificationType) {
        case EnumNotificationType.SLACK:
          if (
            "channel" in content &&
            "message" in content &&
            Boolean(content.channel) &&
            Boolean(content.message)
          )
            await createMessage2(notificationType, {
              channel: content.channel,
              message: content.message,
            });
          else {
            let newFieldErrors = fieldErrors;
            if (!Boolean(content.channel)) {
              newFieldErrors = {
                ...newFieldErrors,
                channel: "This field is required.",
              };
            }
            if (!Boolean(content.message)) {
              newFieldErrors = {
                ...newFieldErrors,
                message: "This field is required.",
              };
            }
            setFieldErrors(newFieldErrors);
            return;
          }
          break;
        // case EnumNotificationType.EMAIL:
      }
      props.handleClose();
      clearForm();
      dispatch(fetchMessages());
    }
  };

  const form = MessageCreateForm({
    notificationType, content, setContent, fieldErrors, setFieldErrors
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
          <InputLabel id="demo-simple-select-label">Project Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={notificationType}
            // Label="project type"
            inputProps={{
              "data-testid": "type-input",
            }}
            onChange={(event: SelectChangeEvent) => {
              setNotificationtype(event.target.value as string);
            }}
            fullWidth
          >
            <MenuItem value={EnumNotificationType.SLACK}>Slack</MenuItem>
            <MenuItem value={EnumNotificationType.EMAIL}>Email</MenuItem>
            <MenuItem value={EnumNotificationType.API}>Api</MenuItem>
            <MenuItem value={EnumNotificationType.SMS}>Sms</MenuItem>
          </Select>
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
