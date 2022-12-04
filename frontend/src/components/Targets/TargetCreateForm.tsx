import {EnumNotificationType} from "../../Enums";
import {InputLabel, TextField} from "@mui/material";

interface IProps {
    notificationType: string;

    targetName: string;
    setTargetName: (name: string) => void;

    endpoint: string;
    setEndpoint: (endpoint: string) => void;
}

export const TargetCreateForm = (props: IProps) => {
  let form;
  const {notificationType, targetName, endpoint, setEndpoint, setTargetName} = props;

  const commonPart = (
    <>
      <InputLabel id="demo-simple-select-label">Name</InputLabel>
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
          onChange={(event) => {setTargetName(event.target.value);}}
          required/>
        <br />
        <br />
        <br />
    </>
  )

  switch (notificationType) {
    case EnumNotificationType.API:
      form = <></>;
      break;
    case EnumNotificationType.EMAIL:
      form = <></>;
      break;
    case EnumNotificationType.SMS:
      form = <></>
      break;
    case EnumNotificationType.SLACK:
      form = (
        <>
          <InputLabel id="demo-simple-select-label">API Token</InputLabel>
          <TextField
              autoFocus
              margin="dense"
              id="end_point"
              // Label="end point"
              type="text"
              fullWidth
              variant="standard"
              value={endpoint}
              inputProps={{ "data-testid": "endpoint-input" }}
              onChange={(event) => {
                setEndpoint(event.target.value);
              }}
              required/>
        <br />
        <br />
        <br />
        </>
      );
      break;

    }
    return (
        <>
            {commonPart}
            {form}
        </>
    )
}
