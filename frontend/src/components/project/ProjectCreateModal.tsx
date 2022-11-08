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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../services/project";
import { AppDispatch } from "../../store";
import { fetchProjects } from "../../store/slices/project";

interface IProps {
  open: any;
  handleClose: any;
}

export default function ProjectCreateModal(props: IProps) {
  const [projectType, setProjectType] = useState("");
  const [projectName, setProjectName] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleClickConfirm = async () => {
    if (projectName && projectType) {
      await createProject(projectName, projectType);
      props.handleClose();
      await dispatch(fetchProjects());
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
        <DialogTitle>New Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="project name"
            type="text"
            fullWidth
            variant="standard"
            value={projectName}
            onChange={(event) => {
              setProjectName(event.target.value);
            }}
            required
          />
          <InputLabel id="demo-simple-select-label">Project Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={projectType}
            label="project type"
            onChange={(event: SelectChangeEvent) => {
              setProjectType(event.target.value as string);
            }}
            fullWidth
          >
            <MenuItem value={"ORGANIZATION"}>Organization</MenuItem>
            <MenuItem value={"INDIVIDUAL"}>Individual</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
