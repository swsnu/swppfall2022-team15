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
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store";
import {createTarget, fetchTargets} from "../../store/slices/target";
import {EnumNotificationType} from "../../Enums";
import {fetchProjects} from "../../store/slices/project";

interface IProps {
  open: any;
  handleClose: any;
}

export default function TargetCreateModal(props: IProps) {
  const [targetName, setTargetName] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [endPoint, setEndPoint] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const handleClickConfirm = async () => {
    if (targetName && notificationType && endPoint) {
      const data = {
        name: targetName,
        notification_type: notificationType,
        endpoint: endPoint,
        data: {},
      };
      dispatch(createTarget(data));
      props.handleClose();
      dispatch(fetchTargets());
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
        <DialogTitle>New Target</DialogTitle>
        <DialogContent>
          <InputLabel id="demo-simple-select-label">Target Name</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="target_name"
            // Label="target name"
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
          <InputLabel id="demo-simple-select-label">
            Notification Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
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
            <MenuItem value={EnumNotificationType.EMAIL.toString()}>
              Email
            </MenuItem>
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
            // Label="end point"
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
        </DialogContent>
        <DialogActions>
          <Button data-testid={"create-button"} onClick={handleClickConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
