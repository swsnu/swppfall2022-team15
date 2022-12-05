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
} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store";
import {createTarget, fetchTargets} from "../../store/slices/target";
import {EnumNotificationType} from "../../Enums";
import {fetchProjects} from "../../store/slices/project";
import {TargetCreateForm} from "./TargetCreateForm";

interface IProps {
  open: any;
  handleClose: any;
}

export default function TargetCreateModal(props: IProps) {
  const [targetName, setTargetName] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [data, setData] = useState({});

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const handleClickConfirm = async () => {
    if (targetName && notificationType && endpoint) {
      const requestData = {
        name: targetName,
        notification_type: notificationType,
        endpoint: endpoint,
        data: data,
      };
      dispatch(createTarget(requestData));
      props.handleClose();
      dispatch(fetchTargets());
    }
  };

  let form = TargetCreateForm({notificationType, targetName, setTargetName, endpoint, setEndpoint, data, setData})

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        fullWidth>
        <DialogTitle>New Target</DialogTitle>
        <DialogContent>
          <InputLabel id="demo-simple-select-label">Notification Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={notificationType}
            // Label="project type"
            inputProps={{
              "data-testid": "type-input",
            }}
            onChange={(event: SelectChangeEvent) => {
              setNotificationType(event.target.value);
              setData({});
            }}
            fullWidth
          >
            <MenuItem value={EnumNotificationType.SLACK}>SLACK</MenuItem>
            <MenuItem value={EnumNotificationType.EMAIL}>EMAIL</MenuItem>
            <MenuItem value={EnumNotificationType.API}>API</MenuItem>
            <MenuItem value={EnumNotificationType.SMS}>SMS</MenuItem>
          </Select>
          <br/>
          <br/>
          <br/>
          {form}
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
