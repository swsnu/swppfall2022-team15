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
import projectService from "../../services/project";
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
      await projectService.createProject(projectName, projectType);
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
          <InputLabel id="demo-simple-select-label">Name</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            inputProps={{
              "data-testid": "name-input",
            }}
            // label="project name"
            type="text"
            fullWidth
            variant="standard"
            value={projectName}
            onChange={(event) => {
              setProjectName(event.target.value);
            }}
            required
          />
          <br />
          <br />
          <br />

          <InputLabel id="demo-simple-select-label">Project Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={projectType}
            // label="project type"
            inputProps={{
              "data-testid": "type-input",
            }}
            onChange={(event: SelectChangeEvent) => {
              setProjectType(event.target.value as string);
            }}
            fullWidth
          >
            <MenuItem value={"ORGANIZATION"}>ORGANIZATION</MenuItem>
            <MenuItem value={"INDIVIDUAL"}>INDIVIDUAL</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button data-testid="confirm-button" onClick={handleClickConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
