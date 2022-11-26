import { FormWrapper } from "./FormWrapper";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EnumNotificationType } from "../../Enums";
import { AppDispatch } from "../../store";
import {
  createNotification,
  fetchNotifications,
} from "../../store/slices/notifications";
import { projectSelect } from "../../store/slices/project";
import { fetchTargets, targetSelect } from "../../store/slices/target";
import { fetchMessages, messageSelect } from "../../store/slices/message";

export default function NotificationForm() {
  const [notificationType, setNotificationType] = useState("");
  // const [template, setTemplate] = useState("");
  const [target, setTarget] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const projectState = useSelector(projectSelect);
  const targetState = useSelector(targetSelect);
  const messageState = useSelector(messageSelect);

  useEffect(() => {
    dispatch(fetchTargets());
    dispatch(fetchMessages());
  }, []);

  const handleClickConfirm = async () => {
    if (projectState.selectedProject && notificationType) {
      const projectId = projectState.selectedProject.id;
      setTarget("target");
      setMessage("message");
      const data = {
        project: projectId,
        type: notificationType,
        target: target,
        message: message,
      };
      dispatch(createNotification(data));
      dispatch(fetchNotifications(projectId));
    }
  };

  return (
    <div>
      <FormWrapper>
        <InputLabel>Notification Type</InputLabel>
        <Select
          value={notificationType}
          inputProps={{
            "data-testid": "notification-type-input",
          }}
          onChange={(event: SelectChangeEvent) => {
            setNotificationType(event.target.value);
          }}
          fullWidth
        >
          <MenuItem value={EnumNotificationType.API}>
            {EnumNotificationType.API}
          </MenuItem>
          <MenuItem value={EnumNotificationType.SMS}>
            {EnumNotificationType.SMS}
          </MenuItem>
          <MenuItem value={EnumNotificationType.EMAIL}>
            {EnumNotificationType.EMAIL}
          </MenuItem>
        </Select>
        <br />
        <br />
        <br />

        <InputLabel>TargetUser</InputLabel>
        <Select
          value={target}
          inputProps={{
            "data-testid": "target-user-input",
          }}
          onChange={(event: SelectChangeEvent) => {
            setTarget(event.target.value);
          }}
          fullWidth
        >
          {targetState.targets &&
            targetState.targets.map((target) => (
              <MenuItem key={target.id} value={target.id}>
                {target.name}
              </MenuItem>
            ))}
        </Select>
        <br />
        <br />
        <br />

        <InputLabel>Message</InputLabel>
        <Select
          value={message}
          inputProps={{
            "data-testid": "message-input",
          }}
          onChange={(event: SelectChangeEvent) => {
            setMessage(event.target.value);
          }}
          fullWidth
        >
          {/* {messageState.messages &&
            messageState.messages.map((message) => (
              <MenuItem key={message.id} value={message.id}>
                {message.id}
              </MenuItem>
            ))} */}
        </Select>
        <br />
        <br />
        <br />
        <Button onClick={handleClickConfirm} data-testid="confirm-button">
          Confirm
        </Button>
      </FormWrapper>
    </div>
  );
}
