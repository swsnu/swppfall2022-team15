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
import { createMessage, fetchMessages } from "../../store/slices/message";
import { AppDispatch } from "../../store";
import { fetchProjects, projectSelect } from "../../store/slices/project";



export default function MessageForm() {
  const [project, setProject] = useState("1");
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
      };
      dispatch(createMessage(data));
      dispatch(fetchMessages());
    }
  };
  return (
    <FormWrapper>
      <InputLabel> Project </InputLabel>
      <Select
        inputProps={{ "data-testid": "project-id" }}
        value={project}
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
      </Select>
      <br />
      <br />
      <br />
      <InputLabel>Content</InputLabel>
      <TextField
        fullWidth
        multiline
        inputProps={{ "data-testid": "content-input" }}
        onChange={(event: any) => {
          setContent(event.target.value);
        }}
        rows={4}
        defaultValue=""
      />
      <Button data-testid="confirm-button" onClick={handleClickConfirm}>
        Confirm
      </Button>
    </FormWrapper>
  );
}
