import {FormWrapper} from "./FormWrapper";
import {Button, Dialog, FormControl, FormControlLabel, Grid, Radio, RadioGroup,} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchMessages, messageSelect} from "../../store/slices/message";
import {AppDispatch} from "../../store";
import MessageForm from "../../components/Message/MessageForm";
import {MessageType} from "../../types";
import MessageTable from "../../components/Message/MessageTable";
import {messageCreateService} from "../../components/Message/utils/MessageRequestSerivce";


interface IProps {
  notificationType: string;

  name: any;
  setName: (name: any) => void;

  data: any;
  setData: (content: any) => void;

  fieldErrors: any;
  setFieldErrors: (error: any) => void;

  message: MessageType | null;
  setMessage: (message: any) => void;
}

export default function MessageStep(props: IProps) {
  const { notificationType, name, setName, data, setData, fieldErrors, setFieldErrors, message, setMessage }= props;

  // ui
  const [mode, setMode] = useState(''); // import , create
  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchMessages());
  }, []);

  const messageState = useSelector(messageSelect);
  const messages = messageState.messages;

  // handler
  const handleImportButton = () => {
    setDialogOpen(true);
  }

  const handleClickConfirm = async () => {
    if (notificationType && name && data) {
      const errorField = await messageCreateService(notificationType, name, data, fieldErrors);
      if (errorField) {
        setFieldErrors(errorField);
      }
      dispatch(fetchMessages());
    }
  };

  const form = MessageForm(props, mode !=='create');
  const getContentFieldName = (notificationType: string): string[] => {
    switch (notificationType) {
      case 'EMAIL':
        return ['title'];
      case 'SMS':
        return ['content']
      case 'SLACK':
        return ['id', 'name', 'data.channel', 'data.message']
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
              setData(message?.data)
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
            setData(message?.data)
            setMessage(message);
            setDialogOpen(false);
          }}/>
          </Grid>
          <Button onClick={()=> setDialogOpen(false)}>Close</Button>
          <Grid lg></Grid>

        </Grid>
      </Dialog>
      <Button data-testid="importMessageButton" variant="contained" onClick={handleImportButton}>Import</Button>
      {form}
      <Button data-testid="confirm-button" onClick={handleClickConfirm}>Confirm</Button>
    </FormWrapper>
  );
}
