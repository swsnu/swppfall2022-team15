import {useState} from "react";
import {MessageType, TargetType} from "../../types";
import SplitButton from "../../components/SplitButton/SplitButton";
import RecurrenceDialog from "../../components/Recurrence/RecurrenceDialog";
import {RecurrenceType} from "../../components/Recurrence";
import MessageForm from "../../components/Message/MessageForm";
import {TextField} from "@mui/material";
import TargetListTable from "../TargetList/TargetList";

interface IProps {
  notificationType: string;
  message: MessageType;
  targets: TargetType[];
  handleRecurrenceChange: (recurrence: RecurrenceType) => void;
}

export default function ReservationStep(props: IProps) {
   const {notificationType, message, targets, handleRecurrenceChange} = props;
   const [open, setOpen] = useState(false);

  const messageForm = MessageForm({notificationType, name: message.name, setName:(x: string)=>{}, data: message.data, setData:(_: string )=>{}, fieldErrors: {}, setFieldErrors: (_: any) => {}}, true);
  const targetTable = TargetListTable()
  return (
    <>
        <RecurrenceDialog
          open={open}
          onClose={()=>setOpen(false)}
          handleRecurrenceChange={props.handleRecurrenceChange}/>
        <h1>Notification Type</h1>
        <TextField
          id="outlined-multiline-static"
          fullWidth
          multiline
          inputProps={{ "data-testid": "message-input" }}
          value={notificationType}
          rows={1}
          disabled={true}
          required/>
        <br />
        <br />
        <br />
        <h1>Message</h1>
        {messageForm}
        <br />
        <br />
        <br />
        <h1>TargetUser</h1>
        {/*{targetUserForm}*/}
        <br />
        <br />
        <br />
        <SplitButton
            setOpen={()=>{setOpen(true)}}
          options={["Reserve", "Fire Immediately"]}/>
    </>
  );
}
