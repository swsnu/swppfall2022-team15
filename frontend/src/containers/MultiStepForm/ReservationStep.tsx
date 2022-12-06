import { useState } from "react";
import { MessageType, TargetUserIdNameDto } from "../../types";
import SplitButton from "../../components/SplitButton/SplitButton";
import RecurrenceDialog from "../../components/Recurrence/RecurrenceDialog";
import { RecurrenceType } from "../../components/Recurrence";
import MessageForm from "../../components/Message/MessageForm";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { targetSelect } from "../../store/slices/target";

interface IProps {
  notificationType: string;
  message: MessageType;
  targetUserIds: TargetUserIdNameDto[];
  handleRecurrenceChange: (recurrence: RecurrenceType) => void;
}

export default function ReservationStep(props: IProps) {
  const { notificationType, message, targetUserIds, handleRecurrenceChange } =
    props;
  const [open, setOpen] = useState(false);

  const messageForm = MessageForm(
    {
      notificationType,
      name: message.name,
      setName: (x: string) => {},
      data: message.data,
      setData: (_: string) => {},
      fieldErrors: {},
      setFieldErrors: (_: any) => {},
    },
    true
  );

  const targetState = useSelector(targetSelect);
  // runtime 에 데이터가 바뀜. mutable.
  const targetUsers = targetState.targets.filter((target) =>
    targetUserIds.map((targetUser) => targetUser.value).includes(target.id)
  );

  return (
    <>
      <RecurrenceDialog
        open={open}
        onClose={() => setOpen(false)}
        handleRecurrenceChange={props.handleRecurrenceChange}
      />
      <h1>Notification Type</h1>
      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        inputProps={{ "data-testid": "message-input" }}
        value={notificationType}
        rows={1}
        disabled={true}
        required
      />
      <br />
      <br />
      <br />
      <h1>Message</h1>
      {messageForm}
      <br />
      <br />
      <br />
      <h1>TargetUser</h1>
      {targetUsers.map((targetUser) => {
        const data = `${targetUser.id}::${targetUser.name}`;
        return <h1>{data}</h1>;
      })}
      <br />
      <br />
      <br />
      <SplitButton
        setOpen={() => {
          setOpen(true);
        }}
        options={["Reserve", "Fire Immediately"]}
      />
    </>
  );
}
