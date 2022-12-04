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
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMessages } from "../../store/slices/message";
import { AppDispatch } from "../../store";
import { fetchProjects } from "../../store/slices/project";
import { EnumNotificationType } from "../../Enums";
import { createMessage2 } from "../../services/message";

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
        case EnumNotificationType.EMAIL:
          if (
            "title" in content &&
            "message" in content &&
            Boolean(content.title) &&
            Boolean(content.message)
          )
            await createMessage2(notificationType, {
              title: content.title,
              message: content.message,
            });
          else {
            let newFieldErrors = fieldErrors;
            if (!Boolean(content.title)) {
              newFieldErrors = {
                ...newFieldErrors,
                title: "This field is required.",
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
        case EnumNotificationType.WEBHOOK:
          if ("message" in content && Boolean(content.message))
            await createMessage2(notificationType, {
              message: content.message,
            });
          else {
            let newFieldErrors = fieldErrors;
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
        case EnumNotificationType.SMS:
          if ("message" in content && Boolean(content.message))
            await createMessage2(notificationType, {
              message: content.message,
            });
          else {
            let newFieldErrors = fieldErrors;
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
      }
      props.handleClose();
      clearForm();
      dispatch(fetchMessages());
    }
  };

  let form;
  switch (notificationType) {
    case EnumNotificationType.SLACK:
      form = (
        <>
          <br />
          <br />
          <br />
          <InputLabel id="demo-simple-select-label">Channel</InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "slack-channel-input" }}
            onChange={(event: any) => {
              setContent({ ...content, channel: event.target.value });
              setFieldErrors({ ...fieldErrors, channel: undefined });
            }}
            value={"channel" in content ? content.channel : ""}
            helperText={fieldErrors?.channel}
            error={Boolean(fieldErrors?.channel)}
            rows={1}
          />
          <br />
          <br />
          <br />
          <InputLabel id="demo-simple-select-label" margin="dense">
            Message
          </InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "slack-message-input" }}
            onChange={(event: any) => {
              setContent({ ...content, message: event.target.value });
              setFieldErrors({ ...fieldErrors, message: undefined });
            }}
            value={"message" in content ? content.message : ""}
            helperText={fieldErrors?.message}
            error={Boolean(fieldErrors?.message)}
            rows={4}
          />
        </>
      );
      break;
    case EnumNotificationType.EMAIL:
      form = (
        <>
          <br />
          <br />
          <InputLabel id="demo-simple-select-label">Title</InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "email-title-input" }}
            onChange={(event: any) => {
              setContent({ ...content, title: event.target.value });
              setFieldErrors({ ...fieldErrors, title: undefined });
            }}
            value={"title" in content ? content.title : ""}
            helperText={fieldErrors?.title}
            error={Boolean(fieldErrors?.title)}
            rows={1}
          />
          <br />
          <br />
          <InputLabel id="demo-simple-select-label" margin="dense">
            Message
          </InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "email-message-input" }}
            onChange={(event: any) => {
              setContent({ ...content, message: event.target.value });
              setFieldErrors({ ...fieldErrors, message: undefined });
            }}
            value={"message" in content ? content.message : ""}
            helperText={fieldErrors?.message}
            error={Boolean(fieldErrors?.message)}
            rows={8}
          />
        </>
      );
      break;
    case EnumNotificationType.WEBHOOK:
      form = (
        <>
          <br />
          <br />
          <InputLabel id="demo-simple-select-label" margin="dense">
            JSON Message
          </InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "webhook-message-input" }}
            onChange={(event: any) => {
              setContent({ ...content, message: event.target.value });
              setFieldErrors({ ...fieldErrors, message: undefined });
            }}
            value={"message" in content ? content.message : ""}
            helperText={fieldErrors?.message}
            error={Boolean(fieldErrors?.message)}
            rows={9}
          />
        </>
      );
      break;
    case EnumNotificationType.SMS:
      form = (
        <>
          <br />
          <br />
          <InputLabel id="demo-simple-select-label" margin="dense">
            Message
          </InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "sms-message-input" }}
            onChange={(event: any) => {
              setContent({ ...content, message: event.target.value });
              setFieldErrors({ ...fieldErrors, message: undefined });
            }}
            value={"message" in content ? content.message : ""}
            helperText={fieldErrors?.message}
            error={Boolean(fieldErrors?.message)}
            rows={9}
          />
        </>
      );
      break;
  }

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
            <MenuItem value={EnumNotificationType.WEBHOOK}>Webhook</MenuItem>
            <MenuItem value={EnumNotificationType.SMS}>SMS</MenuItem>
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
