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
import { useDispatch, useSelector } from "react-redux";
import { EnumNotificationStatus, EnumNotificationType } from "../../Enums";
import { AppDispatch } from "../../store";
import {
  createNotification,
  fetchNotifications,
} from "../../store/slices/notifications";
import { projectSelect } from "../../store/slices/project";
import { fetchTargets, targetSelect } from "../../store/slices/target";
import { fetchMessages } from "../../store/slices/message";

interface IProps {
  open: any;
  handleClose: any;
}

export default function NotificationCreateModal(props: IProps) {
  // TODO - terminology. messageType vs notificationType
  const [notificationType, setNotificationType] = useState("");
  // const [template, setTemplate] = useState("");
  const [target, setTarget] = useState("");

  const [message, setMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const projectState = useSelector(projectSelect);
  const targetState = useSelector(targetSelect);

  useEffect(() => {
    dispatch(fetchTargets());
    dispatch(fetchMessages());
  }, []);

  const handleClickConfirm = async () => {
    //FIXME
    if (projectState.selectedProject && notificationType) {
      const projectId = projectState.selectedProject.id;
      // TODO
      // DTO management. should decide where to place
      // https://github.com/swsnu/swppfall2022-team15/issues/52
      setTarget("target");
      setMessage("message");
      const data = {
        //TODO - should be changed to template
        status: EnumNotificationStatus.SUCCESS,
        id: 0,
        type: notificationType,
        message: "",
        reservedAt: "2021-12-12",
        history: [],
      };
      dispatch(createNotification(data));
      props.handleClose();
      dispatch(fetchNotifications(projectId));
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
        <DialogTitle>New Notification</DialogTitle>
        <DialogContent>
          <InputLabel id="demo-simple-select-label">
            Notification Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={notificationType}
            label="project type"
            inputProps={{
              "data-testid": "notification-type-input",
            }}
            onChange={(event: SelectChangeEvent) => {
              setNotificationType(event.target.value);
            }}
            fullWidth
          >
            <MenuItem value={EnumNotificationType.WEBHOOK}>
              {EnumNotificationType.WEBHOOK}
            </MenuItem>
            <MenuItem value={EnumNotificationType.SMS}>
              {EnumNotificationType.SMS}
            </MenuItem>
            <MenuItem value={EnumNotificationType.EMAIL}>
              {EnumNotificationType.EMAIL}
            </MenuItem>
            {/*{ projectState.selectedProject?.project_type === EnumProjectType.ORGANIZATION && */}
            {/*  EnumNotificationType.OrganizationNotificationType().map(key => <MenuItem value={key}>{key}</MenuItem>)}*/}
            {/*{ projectState.selectedProject?.project_type === EnumProjectType.INDIVIDUAL && */}
            {/*  EnumNotificationType.IndividualNotificationType().map(key => <MenuItem value={key}>{key}</MenuItem>)}*/}
          </Select>
          <br />
          <br />
          <br />
          {/*<InputLabel id="demo-simple-select-Label">Template</InputLabel>*/}
          {/*<Select*/}
          {/*  labelId="demo-simple-select-Label"*/}
          {/*  id="demo-simple-select"*/}
          {/*  value={template}*/}
          {/*  Label="notification type"*/}
          {/*  onChange={(event: SelectChangeEvent) => {*/}
          {/*    setTemplate(event.target.value);*/}
          {/*  }}*/}
          {/*  fullWidth*/}
          {/*> */}
          {/*  {EnumTemplateType.TemplateOf(notificationType).map(key => <MenuItem value={key}>{key}</MenuItem>)}*/}
          {/*</Select>*/}

          <InputLabel id="demo-simple-select-label">TargetUser</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={target}
            label="target"
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

          <InputLabel id="demo-simple-select-label">Message</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={message}
            label="target"
            inputProps={{
              "data-testid": "message-input",
            }}
            // onChange={(event: SelectChangeEvent) => {setMessage(event.target.value);}}

            fullWidth
          >
            {/* { messageState.messages &&
                  messageState.messages.map(message => <MenuItem key={message.id} value={message.id}>{message.id}</MenuItem> )
              } */}
          </Select>
          <br />
          <br />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickConfirm} data-testid="confirm-button">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
