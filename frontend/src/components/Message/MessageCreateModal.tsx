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
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "../../store/slices/message";
import { AppDispatch } from "../../store";
import { fetchProjects, projectSelect } from "../../store/slices/project";
import { EnumNotificationType } from "../../Enums";
import { createMessage2 } from "../../services/message";

interface IProps {
  open: any;
  handleClose: any;
}

export default function MessageCreateModal(props: IProps) {
  const [project, setProject] = useState("1");
  const [notificationType, setNotificationtype] = useState("");
  const [content, setContent]: [any, any] = useState({});

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const projectState = useSelector(projectSelect);

  const handleClickConfirm = async () => {
    if (notificationType) {
      switch (notificationType) {
        case EnumNotificationType.SLACK:
          if (
            "channel" in content &&
            "message" in content &&
            content.channel &&
            content.message
          )
            await createMessage2(notificationType, {
              channel: content.channel,
              message: content.message,
            });
          break;
        // case EnumNotificationType.EMAIL:
      }
      props.handleClose();
      dispatch(fetchMessages());
    }
  };

  let form;
  switch (notificationType) {
    case EnumNotificationType.API:
      form = <></>;
      break;
    case EnumNotificationType.EMAIL:
      form = <></>;
      break;
    case EnumNotificationType.SMS:
      form = <></>;
      break;
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
            }}
            value={"channel" in content ? content.channel : ""}
            rows={1}
            defaultValue=""
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
            }}
            value={"message" in content ? content.message : ""}
            rows={4}
            defaultValue=""
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
          {/* <InputLabel id="demo-simple-select-label"> Project </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            inputProps={{ "data-testid": "project-id" }}
            value={project}
            // label="project type"
            onChange={(event: SelectChangeEvent) => {
              setProject(event.target.value);
            }}
            fullWidth
          >
            {projectState.projects.map((project) => (
              <MenuItem key={project.id} value={project.name}>
                {project.name}
              </MenuItem>
            ))}
          </Select> */}
          {/* <br /> */}
          {/* <br /> */}
          {/* <br /> */}
          <InputLabel id="demo-simple-select-label">Project Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={notificationType}
            // label="project type"
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
          {/* <InputLabel id="demo-simple-select-label">Content</InputLabel> */}
          {/* <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "content-input" }}
            onChange={(event: any) => {
              setContent(event.target.value);
            }}
            rows={4}
            defaultValue=""
          /> */}
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
