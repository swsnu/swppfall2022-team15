import {FormWrapper} from "./FormWrapper";
import {Button, FormControl, FormControlLabel, InputLabel, Radio, RadioGroup, TextField,} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {createTarget, fetchTargets} from "../../store/slices/target";
import {fetchProjects, projectSelect} from "../../store/slices/project";
import TargetUserMultiSelect from "../../components/TargetUserMultiSelect/TargetUserMultiSelect";


interface IProps {
    notificationType: string;
}

export default function TargetForm(props: IProps) {
  const [mode, setMode] = useState(''); // import , create

  const [targetName, setTargetName] = useState("");
  const [endPoint, setEndPoint] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const projectState = useSelector(projectSelect);
  const project = projectState.selectedProject;

  const handleClickConfirm = async () => {
    if (targetName && props.notificationType && endPoint) {
      const data = {
        name: targetName,
        notification_type: props.notificationType,
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
        <FormControl>
        <RadioGroup
          aria-label="notificationType"
          onChange={(e) => {
             setMode(e.target.value);
          }}
          defaultValue="Import"
          name="radio-buttons-group">
          <FormControlLabel value ={'import'} control={<Radio/>} label={"Import"}/>
          <FormControlLabel value ={'create'} control={<Radio/>} label={"Create"}/>
        </RadioGroup>
      </FormControl>

    {mode === 'import' && (// import
        <>
          <TargetUserMultiSelect notification_type={props.notificationType}/>
        </>
        )
    }

    {mode==='create' && ( // create
        <>
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
        <Button data-testid={"create-button"} onClick={handleClickConfirm}>Confirm</Button>
    </> )}
    </FormWrapper>
  );
}
