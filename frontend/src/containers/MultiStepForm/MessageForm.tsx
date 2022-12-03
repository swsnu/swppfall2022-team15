import {FormWrapper} from "./FormWrapper";
import {Button, FormControl, FormControlLabel, InputLabel, Radio, RadioGroup, TextField,} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createMessage, fetchMessages} from "../../store/slices/message";
import {AppDispatch} from "../../store";
import {projectSelect} from "../../store/slices/project";
import {EnumNotificationType} from "../../Enums";


interface IProps {
    notificationType: string;
}

export default function MessageForm(props: IProps) {
  // ui
  const [isCreate, setIsCreate] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchMessages());
  }, []);

  const projectState = useSelector(projectSelect);
  const project = projectState.selectedProject;

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

  let form;
  const [fieldErrors, setFieldErrors]: [any, any] = useState({});
  const [content, setContent]: [any, any] = useState({});

  console.log(props.notificationType == EnumNotificationType.SLACK);
  switch (props.notificationType) {
    case EnumNotificationType.API:
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
          />
        </>
      );
      break;
  }

  return (
    <FormWrapper>
      <FormControl>
        <RadioGroup
          aria-label="notificationType"
          onChange={(e) => {
              setIsCreate(e.target.value === "create");
          }}
          defaultValue="Import"
          name="radio-buttons-group">
          <FormControlLabel value ={'import'} control={<Radio/>} label={"Import"}/>
          <FormControlLabel value ={'create'} control={<Radio/>} label={"Create"}/>
        </RadioGroup>
      </FormControl>
    {
        !isCreate && // import
        (
            <>
            </>
        )
    }
    {isCreate &&
        ( // create
        <>
          <InputLabel>Content</InputLabel>
          {form}
          <Button data-testid="confirm-button" onClick={handleClickConfirm}>Confirm</Button>
        </>)
      }
    </FormWrapper>
  );
}
