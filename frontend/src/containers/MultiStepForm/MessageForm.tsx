import {FormWrapper} from "./FormWrapper";
import {
  Button, Dialog,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent, TableContainer,
  TextField,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createMessage, fetchMessages, messageSelect} from "../../store/slices/message";
import {AppDispatch} from "../../store";
import {projectSelect} from "../../store/slices/project";
import MessageCreateForm from "../../components/Message/MessageCreateForm";
import {MessageType} from "../../types";
import MessageTable from "../../components/Message/MessageTable";
import {EnumNotificationType} from "../../Enums";
import Scrollbar from "../../components/Scrollbar/Scrollbar";


interface IProps {
  notificationType: string;

  content: any;
  setContent: (content: any) => void;

  fieldErrors: any;
  setFieldErrors: (error: any) => void;

  message: MessageType | null;
  setMessage: (message: any) => void;
}

export default function MessageForm(props: IProps) {
  const { notificationType, content, setContent, fieldErrors, setFieldErrors, message, setMessage }= props;

  // ui
  const [mode, setMode] = useState(''); // import , create
  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchMessages());
  }, []);

  const projectState = useSelector(projectSelect);
  const project = projectState.selectedProject;

  const messageState = useSelector(messageSelect);
  const messages = messageState.messages;

  // handler
  const handleImportButton = () => {
    setDialogOpen(true);
  }

  const handleClickConfirm = async () => {
    if (project && content) {
      if (message?.content === content) {

      }
      const data = {
        project: Number(project),
        content: content,
      };
      dispatch(createMessage(data));
      dispatch(fetchMessages());
    }
  };

  const form = MessageCreateForm(props, mode==='import');
  const getContentFieldName = (notificationType: string): string[] => {
    switch (notificationType) {
      case 'EMAIL':
        return ['title'];
      case 'SMS':
        return ['content']
      case 'SLACK':
        return ['channel', 'message']
    }
    return [""];
  }

  const contentFieldList = getContentFieldName(notificationType);

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
      <Dialog
        open={dialogOpen}
        onClose={()=> setDialogOpen(false)}
        maxWidth="md" // TODO responsive
        fullWidth={true}>
        <Scrollbar>
          <TableContainer>
        <MessageTable
          columns={contentFieldList} // todo: refactor
          keys={contentFieldList}
          rows={messages[notificationType]}
          handleOpenMenu={null}
          onClickRow={(id: number) => {

            console.log("id is ", id);
            const message = messages[notificationType].find((message: any) => message.id === id);
            console.log("message is ", message)
            console.log("content is ", content)
            setMessage(message);
            setContent(message?.content)

            setDialogOpen(false);
          }}
      /></TableContainer>
          </Scrollbar>
    </Dialog>
      <Button data-testid="importMessageButton" variant="contained" onClick={handleImportButton}>Import</Button>
    {
        /*mode == 'import' && // import
        (<>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={message?.id.toString()}
            // Label="project type"
            inputProps={{
              "data-testid": "type-input",
            }}
            onChange={(event: SelectChangeEvent) => {
              const selectedMessage = messages[notificationType].find(message => message.id == Number(event.target.value));
              setMessage(selectedMessage);
            }}
            fullWidth>
              {
                messages[notificationType].map((message) => {
                  return (
                    <MenuItem value={message.id} aria-multiline={true}>{message.id}::{message.content[contentFieldName] as string}</MenuItem>
                  );
                })
              }
          </Select>
          {preview}
        </>
      )*/
    }
    {<>
      {form}
        <Button data-testid="confirm-button" onClick={handleClickConfirm}>Confirm</Button>
      </>
      }
    </FormWrapper>
  );
}
