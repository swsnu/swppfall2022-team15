import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel, MenuItem, Select, SelectChangeEvent,
  TextField,
} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createMessage, fetchMessages} from "../../store/slices/message";
import { AppDispatch } from "../../store";
import {fetchProjects, projectSelect} from "../../store/slices/project";

interface IProps {
  open: any;
  handleClose: any;
}

export default function MessageCreateModal(props: IProps) {
  const [project, setProject] = useState("");
  const [content, setContent] = useState("");


  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const projectState = useSelector(projectSelect);

  const handleClickConfirm = async () => {
    if (project && content) {
      const data = {
        project: Number(project),
        content: content,
      }
      dispatch(createMessage(data));
      props.handleClose();
      dispatch(fetchMessages());
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
        <DialogTitle>New Message</DialogTitle>
        <DialogContent>
          <InputLabel id="demo-simple-select-label"> Project </InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={project}
              // label="project type"
              onChange={(event: SelectChangeEvent) => {
                setProject(event.target.value);
              }}
              fullWidth
            >
            {/*// TODO : change to enum and add conditions (filerr) */}
            {projectState.projects.map(project => <MenuItem value={project.id}>{project.name}</MenuItem>)}
            </Select>
          <br/>
          <br/>
          <br/>

          <InputLabel id="demo-simple-select-label">Content</InputLabel>
          <TextField
              id="outlined-multiline-static"
              fullWidth
              multiline
              onChange={(event: any) => {setContent(event.target.value)}}
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
