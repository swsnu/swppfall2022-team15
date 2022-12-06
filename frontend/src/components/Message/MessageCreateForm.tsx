import {EnumNotificationType} from "../../Enums";
import {InputLabel, TextField} from "@mui/material";

interface IProps {
  notificationType: string;

  name: string;
  setName: (name: string) => void;

  content: any;
  setContent: (content: any) => void;

  fieldErrors: any;
  setFieldErrors: (error: any) => void;
}


export default function MessageCreateForm(props: IProps, disabled: boolean = false) {
  let form;
  const {name, setName, notificationType, content, setContent, fieldErrors, setFieldErrors} = props;

  switch (notificationType) {
    case EnumNotificationType.WEBHOOK:
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
          <InputLabel id="demo-simple-select-label">Name</InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "message-input" }}
            onChange={(event) => {
                setName(event.target.value);
            }}
            value={name}
            rows={1}
            disabled={disabled}
            required/>
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
              setFieldErrors({ ...fieldErrors, channel: undefined });
            }}
            value={"channel" in content ? content.channel : ""}
            helperText={fieldErrors?.channel}
            error={Boolean(fieldErrors?.channel)}
            rows={1}
            disabled={disabled}
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
              setFieldErrors({ ...fieldErrors, message: undefined });
            }}
            value={"message" in content ? content.message : ""}
            helperText={fieldErrors?.message}
            error={Boolean(fieldErrors?.message)}
            rows={4}
            disabled={disabled}
          />
        </>
      );
      break;
  }

  return form;
}