import {InputLabel,} from "@mui/material";
import {useState} from "react";
import {MessageType, TargetType} from "../../types";
import SplitButton from "../../components/SplitButton/SplitButton";
import RecurrenceDialog from "../../components/Recurrence/RecurrenceDialog";
import {RecurrenceType} from "../../components/Recurrence";

interface IProps {
  notificationType: string;
  message: MessageType;
  target: TargetType;
  handleRecurrenceChange: (recurrence: RecurrenceType) => void;
}

export default function ReservationForm(props: IProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
        <RecurrenceDialog
          open={open}
          onClose={()=>setOpen(false)}
          handleRecurrenceChange={props.handleRecurrenceChange}/>
        <InputLabel>Notification Type</InputLabel>
        {props.notificationType}
        <br />
        <br />
        <br />
        <InputLabel>TargetUser</InputLabel>
        {props.target}
        <br />
        <br />
        <br />
        <InputLabel>Message</InputLabel>
        <br />
        <br />
        <br />
        <SplitButton
            setOpen={()=>{setOpen(true)}}
          options={["Reserve", "Fire Immediately"]}/>
    </>
  );
}
