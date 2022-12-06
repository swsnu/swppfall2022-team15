import {FormWrapper} from "./FormWrapper";
import {Button, Dialog, FormControl, FormControlLabel, Grid, Radio, RadioGroup,} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchMessages, messageSelect} from "../../store/slices/message";
import {AppDispatch} from "../../store";
import {projectSelect} from "../../store/slices/project";
import MessageCreateForm from "../../components/Message/MessageCreateForm";
import {MessageType} from "../../types";
import MessageTable from "../../components/Message/MessageTable";
import {messageCreateService} from "../../components/Message/utils/NotificationRequestSerivce";


interface IProps {
  notificationType: string;

  name: any;
  setName: (name: any) => void;

  content: any;
  setContent: (content: any) => void;

  fieldErrors: any;
  setFieldErrors: (error: any) => void;

  message: MessageType | null;
  setMessage: (message: any) => void;
}

export default function MessageStep(props: IProps) {
  const { notificationType, name, setName, content, setContent, fieldErrors, setFieldErrors, message, setMessage }= props;

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
      const errorField = await messageCreateService(notificationType, content, fieldErrors);
      dispatch(fetchMessages());
    }
  };

  const form = MessageCreateForm(props, mode !=='create');
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
              setName(message?.name);
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
        maxWidth="lg"
        fullWidth={true}>
        <Grid
          container
          style={{ minHeight: "100vh" }}
          alignItems="top"
          justifyContent="top"
          marginTop={4}>
          <Grid lg></Grid>
          <Grid lg={10}>

        <MessageTable
          columns={contentFieldList} // todo: refactor
          keys={contentFieldList}
          rows={messages[notificationType]}
          handleOpenMenu={null}
          onClickRow={(id: number) => {
            const message = messages[notificationType].find((message: any) => message.id === id);
            setName(message?.name);
            setContent(message?.content)
            setMessage(message);
            setDialogOpen(false);
          }}/>
          </Grid>
            <Grid lg></Grid>

        </Grid>
      </Dialog>
      <Button data-testid="importMessageButton" variant="contained" onClick={handleImportButton}>Import</Button>
      {form}
      <Button data-testid="confirm-button" onClick={handleClickConfirm}>Confirm</Button>
    </FormWrapper>
  );
}
