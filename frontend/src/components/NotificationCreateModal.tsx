import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, MenuItem,
  InputLabel,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { EnumNotificationType, EnumTemplateType, EnumProjectType } from "../Enums";

import { useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { createNotification, fetchNotifcations } from "../store/slices/notifications";
import {fetchProject, projectSelect} from "../store/slices/project";
import AutoCompleteBox from "./autoComplete";
import {fetchTargets, targetSelect} from "../store/slices/target";
import {fetchMessages, messageSelect} from "../store/slices/message";

  
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
    const messageState = useSelector(messageSelect);

    useEffect(() => {
      dispatch(fetchTargets());
      dispatch(fetchMessages());
    }, []);

    
    const handleClickConfirm = async () => {
      //FIXME
      if (projectState.selectedProject && message &&notificationType) {
        const projectId = projectState.selectedProject.id
        // TODO
        // DTO management. should decide where to place
        // https://github.com/swsnu/swppfall2022-team15/issues/52
        const data = {
          project: projectId,
          type: notificationType,
          message: message,
        }
        dispatch(createNotification(data));
        props.handleClose();
        dispatch(fetchNotifcations(projectId));
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
            <InputLabel id="demo-simple-select-label">Notification Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={notificationType}
              label="project type"
              onChange={(event: SelectChangeEvent) => {
                setNotificationType(event.target.value);
              }}
              fullWidth
            >
              <MenuItem value={EnumNotificationType.API}>{EnumNotificationType.API}</MenuItem>
              <MenuItem value={EnumNotificationType.SMS}>{EnumNotificationType.SMS}</MenuItem>
              <MenuItem value={EnumNotificationType.EMAIL}>{EnumNotificationType.EMAIL}</MenuItem>
              {/*{ projectState.selectedProject?.project_type === EnumProjectType.ORGANIZATION && */}
              {/*  EnumNotificationType.OrganizationNotificationType().map(key => <MenuItem value={key}>{key}</MenuItem>)}*/}
              {/*{ projectState.selectedProject?.project_type === EnumProjectType.INDIVIDUAL && */}
              {/*  EnumNotificationType.IndividualNotificationType().map(key => <MenuItem value={key}>{key}</MenuItem>)}*/}
            </Select>
            <br/>
            <br/>
            <br/>
            {/*<InputLabel id="demo-simple-select-label">Template</InputLabel>*/}
            {/*<Select*/}
            {/*  labelId="demo-simple-select-label"*/}
            {/*  id="demo-simple-select"*/}
            {/*  value={template}*/}
            {/*  label="notification type"*/}
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
              onChange={(event: SelectChangeEvent) => {
                setTarget(event.target.value);
              }}
              fullWidth
            >
              { targetState.targets &&
                  targetState.targets.map(target => <MenuItem value={target.id}>{target.name}</MenuItem> )
              }
            </Select>
            <br/>
            <br/>
            <br/>

            <InputLabel id="demo-simple-select-label">Message</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={message}
              label="target"
              onChange={(event: SelectChangeEvent) => {
                setMessage(event.target.value);
              }}
              fullWidth
            >
              { messageState.messages &&
                  messageState.messages.map(message => <MenuItem value={message.id}>{message.content}</MenuItem> )
              }
            </Select>
            <br/>
            <br/>
            <br/>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickConfirm}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  