import {useEffect, useState} from "react";
import {MessageType, TargetUserIdNameDto} from "../../types";
import SplitButton from "../../components/SplitButton/SplitButton";
import RecurrenceDialog from "../../components/Recurrence/RecurrenceDialog";
import {EndingConditionType, FrequencyType, RecurrenceType} from "../../components/Recurrence";
import MessageForm from "../../components/Message/MessageForm";
import {TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {targetSelect} from "../../store/slices/target";
import {RRule} from "rrule";

interface IProps {
  notificationType: string;
  message: MessageType;
  targetUserIds: TargetUserIdNameDto[];
}

export default function ReservationStep(props: IProps) {
  const {notificationType, message, targetUserIds} = props;
  const [open, setOpen] = useState(false);

  const messageForm = MessageForm({notificationType, name: message.name, setName:(x: string)=>{}, data: message.data, setData:(_: string )=>{}, fieldErrors: {}, setFieldErrors: (_: any) => {}}, true);

  const targetState = useSelector(targetSelect);
  // runtime 에 데이터가 바뀜. mutable.
  const targetUsers = targetState.targets.filter((target) => targetUserIds.map((targetUser) => targetUser.value).includes(target.id));

  const today = new Date()
  const defaultRecurrence = {
    startDate: today,
    endDate: today,
    frequency: FrequencyType.Weekly,
    numberOfRepetitions: 1,

    weekDaysRepetition: [],
    endingCondition: EndingConditionType.None,
    endingOccurrencesNumber: 0,
    isAllDay: false,
    startTime: today,
    endTime: today
 }

  const [recurrence, setRecurrence] = useState<RecurrenceType>(defaultRecurrence);
    const [rrules, setRrules] = useState<RRule | null>(null);
    const handleRecurrenceChange = (recurrenceType: RecurrenceType) => {
      setRecurrence(recurrenceType)
  }
    const [mode, setMode] = useState("")

 /*
 data hinders encapsulation
 everywhere, data can be mutated.
 so logic placement is not bound to the "concerns".
 anywhere you go. since data is reactive
 * */

  useEffect(() => {
    // setRrule(newRrule)
    },[recurrence])


  const reservation = rrules?.all().map((rrule) => {
      return <>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "sms-name-input" }}
            value={rrule.toString()}
            rows={1}
            disabled={true}
            required
          />
        <br/>
        <br/>
        <br/>
      </>
  })

  return (
    <>
        <RecurrenceDialog
          open={open}
          onClose={()=>setOpen(false)}
          recurrence={recurrence}
          handleRecurrenceChange={handleRecurrenceChange}
          setRrule={setRrules}/>
        {/* info */}
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
        {targetUsers.map((targetUser) => {
            const data = `${targetUser.id}::${targetUser.name}`
            return <h1>{data}</h1>})
        }
        <br />
        <br />
        <br />

        <h1>Reservation</h1>
        {reservation}
        <SplitButton
          mode={mode}
          setMode={setMode}
          setOpen={()=>{setOpen(true)}}
          options={["Reserve", "Fire Immediately"]}/>
    </>
  );
}
