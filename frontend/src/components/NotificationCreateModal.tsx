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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { EnumNotificationType, EnumTemplateType, EnumProjectType } from "../enums";

import { useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { createNotification, fetchNotifcations } from "../store/slices/notifications";
import { projectSelect } from "../store/slices/project";
import AutoCompleteBox from "./autoComplete";

  
interface IProps {
  open: any;
  handleClose: any;
}
  
  export default function NotificationCreateModal(props: IProps) {
    // TODO - terminology. messageType vs notificationType
    const [notificationType, setNotificationType] = useState("");
    const [template, setTemplate] = useState("");
    
    const [message, setMessage] = useState("");
  
    const dispatch = useDispatch<AppDispatch>();

    const projectState = useSelector(projectSelect);  
    
    const handleClickConfirm = async () => {
      //FIXME
      console.log("projectState", projectState);
      if (projectState.selectedProject && message &&notificationType) {
        console.log("projectState.selectedProject", projectState.selectedProject);
        const projectId = projectState.selectedProject.id
        const data = {
          projectId: projectId,
          notificationType: notificationType,
          message: message,
        }
        await createNotification(data);
        props.handleClose();
        await dispatch(fetchNotifcations(projectId));
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
              { projectState.selectedProject?.project_type == EnumProjectType.ORGANIZATION && 
                EnumNotificationType.IndividualNotificationType().map(key => <MenuItem value={key}>{key}</MenuItem>)}
              { projectState.selectedProject?.project_type == EnumProjectType.INDIVIDUAL && 
                EnumNotificationType.OrganizationNotificationType().map(key => <MenuItem value={key}>{key}</MenuItem>)}
            </Select>
            <InputLabel id="demo-simple-select-label">Template</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={template}
              label="notification type"
              onChange={(event: SelectChangeEvent) => {
                setTemplate(event.target.value);
              }}
              fullWidth
            > 
              {EnumTemplateType.TemplateOf(notificationType).map(key => <MenuItem value={key}>{key}</MenuItem>)}
            </Select>

            <InputLabel id="demo-simple-select-label">TargetUser</InputLabel>
            <AutoCompleteBox/>

            <InputLabel id="demo-simple-select-label">Message</InputLabel>

            <TextField
              id="outlined-multiline-static"
              fullWidth
              multiline
              onChange={(event: any) => {setMessage(event.target.value)}}
              rows={4}
              defaultValue=""
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickConfirm}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  