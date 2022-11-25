import { FormWrapper } from "./FormWrapper";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { createTarget, fetchTargets } from "../../store/slices/target";
import { EnumNotificationType } from "../../Enums";
import { fetchProjects, projectSelect } from "../../store/slices/project";

export default function TargetForm() {
  const [targetName, setTargetName] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [project, setProject] = useState("");
  const [endPoint, setEndPoint] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);
  const projectState = useSelector(projectSelect);

  const handleClickConfirm = async () => {
    if (targetName && notificationType && endPoint) {
      const data = {
        name: targetName,
        notification_type: notificationType,
        endpoint: endPoint,
        data: {},
        project: Number(project),
      };
      dispatch(createTarget(data));
      dispatch(fetchTargets());
    }
  };

  return (
    <FormWrapper>
      <InputLabel>Target Name</InputLabel>
      <TextField
        autoFocus
        margin="dense"
        type="text"
        fullWidth
        variant="standard"
        value={targetName}
        inputProps={{ "data-testid": "target-input" }}
        onChange={(event) => {
          setTargetName(event.target.value);
        }}
        required
      />
      <br />
      <br />
      <br />
      <InputLabel>Notification Type</InputLabel>
      <Select
        value={notificationType}
        label="project type"
        onChange={(event: SelectChangeEvent) => {
          setNotificationType(event.target.value);
        }}
        inputProps={{
          "data-testid": "project-type",
        }}
        fullWidth
      >
        <MenuItem value={EnumNotificationType.API.toString()}>API</MenuItem>
        <MenuItem value={EnumNotificationType.EMAIL.toString()}>Email</MenuItem>
        <MenuItem value={EnumNotificationType.SMS.toString()}>SMS</MenuItem>
      </Select>
      <br />
      <br />
      <br />
      <InputLabel id="demo-simple-select-label">End Point</InputLabel>
      <TextField
        autoFocus
        margin="dense"
        id="end_point"
        type="text"
        fullWidth
        variant="standard"
        value={endPoint}
        inputProps={{ "data-testid": "endpoint-input" }}
        onChange={(event) => {
          setEndPoint(event.target.value);
        }}
        required
      />
      <br />
      <br />
      <br />
      <InputLabel>Project</InputLabel>
      <Select
        value={project}
        onChange={(event: SelectChangeEvent) => {
          setProject(event.target.value);
        }}
        inputProps={{ "data-testid": "project-id" }}
        fullWidth
      >
        {/*// TODO : change to enum and add conditions (filerr) */}
        {projectState.projects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.name}
          </MenuItem>
        ))}
      </Select>
      <br />
      <br />
      <br />
      <Button data-testid={"create-button"} onClick={handleClickConfirm}>
        Confirm
      </Button>
    </FormWrapper>
  );
}
