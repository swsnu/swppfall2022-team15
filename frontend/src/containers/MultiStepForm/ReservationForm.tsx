import {useState} from "react";
import {MessageType, TargetType} from "../../types";
import SplitButton from "../../components/SplitButton/SplitButton";
import RecurrenceDialog from "../../components/Recurrence/RecurrenceDialog";
import {RecurrenceType} from "../../components/Recurrence";
import MessageCreateForm from "../../components/Message/MessageCreateForm";

interface IProps {
  notificationType: string;
  message: MessageType;
  target: TargetType;
  handleRecurrenceChange: (recurrence: RecurrenceType) => void;
}

export default function ReservationForm(props: IProps) {
   const {notificationType, message, target, handleRecurrenceChange} = props;
   const [open, setOpen] = useState(false);

  const messageForm = MessageCreateForm({notificationType, name: message.name, setName:(x: string)=>{}, content: message.content, setContent:(_: string )=>{}, fieldErrors: {}, setFieldErrors: (_: any) => {}}, true);
  // const targetUserForm = TargetCreateForm({target: target, setTarget: (_: TargetType) => {}}, true);

  return (
    <>
        <RecurrenceDialog
          open={open}
          onClose={()=>setOpen(false)}
          handleRecurrenceChange={props.handleRecurrenceChange}/>
        <h1>Notification Type</h1>
        {props.notificationType}
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
