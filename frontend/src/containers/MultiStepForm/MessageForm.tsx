import {FormWrapper} from "./FormWrapper";
import {Button, FormControl, FormControlLabel, InputLabel, Radio, RadioGroup, TextField,} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createMessage, fetchMessages} from "../../store/slices/message";
import {AppDispatch} from "../../store";
import {projectSelect} from "../../store/slices/project";
import {EnumNotificationType} from "../../Enums";
import MessageCreateForm from "../../components/Message/MessageCreateForm";


interface IProps {
  notificationType: string;

  content: any;
  setContent: (content: any) => void;

  fieldErrors: any;
  setFieldErrors: (error: any) => void;
}

export default function MessageForm(props: IProps) {
  const { content }= props;

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

  const form = MessageCreateForm(props);

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
