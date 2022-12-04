import {FormWrapper} from "./FormWrapper";
import {Button, Dialog, FormControl, FormControlLabel, Radio, RadioGroup, TableContainer,} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchMessages, messageSelect} from "../../store/slices/message";
import {AppDispatch} from "../../store";
import {projectSelect} from "../../store/slices/project";
import MessageCreateForm from "../../components/Message/MessageCreateForm";
import {MessageType} from "../../types";
import MessageTable from "../../components/Message/MessageTable";
import Scrollbar from "../../components/Scrollbar/Scrollbar";
import {EnumNotificationType} from "../../Enums";
import {createMessage2} from "../../services/message";


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
      switch (notificationType) {
        case EnumNotificationType.SLACK:
          if (
            "channel" in content &&
            "message" in content &&
            Boolean(content.channel) &&
            Boolean(content.message)
          )
            await createMessage2(notificationType, {
              channel: content.channel,
              message: content.message,
            });
          else {
            let newFieldErrors = fieldErrors;
            if (!Boolean(content.channel)) {
              newFieldErrors = {
                ...newFieldErrors,
                channel: "This field is required.",
              };
            }
            if (!Boolean(content.message)) {
              newFieldErrors = {
                ...newFieldErrors,
                message: "This field is required.",
              };
            }
            setFieldErrors(newFieldErrors);
            return;
          }
          break;
        // case EnumNotificationType.EMAIL:
      }
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
            if (e.target.value === 'import' && message) {
              setContent(message?.content)
            }
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
            const message = messages[notificationType].find((message: any) => message.id === id);
            setMessage(message);
            setContent(message?.content)

            setDialogOpen(false);
          }}
      /></TableContainer>
          </Scrollbar>
    </Dialog>
      <Button data-testid="importMessageButton" variant="contained" onClick={handleImportButton}>Import</Button>
      {form}
      <Button data-testid="confirm-button" onClick={handleClickConfirm}>Confirm</Button>
    </FormWrapper>
  );
}
