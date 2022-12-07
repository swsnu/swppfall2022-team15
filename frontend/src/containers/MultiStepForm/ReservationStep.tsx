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
  const handleRecurrenceChange = (r: RecurrenceType) => {
    console.log(r)
    setRecurrence(r)
  }
  const [mode, setMode] = useState("")
  const [rrule, setRrule] = useState<RRule | null>(null);

 /*
 data hinders encapsulation
 everywhere, data can be mutated.
 so logic placement is not bound to the "concerns".
 anywhere you go. since data is reactive
 * */

  useEffect(() => {
    let frequency;
    switch (recurrence.frequency) {
      case FrequencyType.Annually:
        frequency = RRule.YEARLY;
        break;
      case FrequencyType.Monthly:
        frequency = RRule.MONTHLY;
        break;
      case FrequencyType.Weekly:
        frequency = RRule.WEEKLY;
        break;
      case FrequencyType.Daily:
        frequency = RRule.DAILY;
        break;
      case FrequencyType.Hourly:
        frequency = RRule.HOURLY;
        break;
      case FrequencyType.Minutely:
        frequency = RRule.MINUTELY;
        break;
      }

    let interval = recurrence.numberOfRepetitions

    switch (recurrence.endingCondition) {
      case EndingConditionType.None:
        break;
      case EndingConditionType.EndDate:
        let endDate = recurrence.endDate;
        break;
      case EndingConditionType.OccurrencesNumber:

        break;
    }

    let startDate = recurrence.startDate;
    let newRrule = new RRule({
        freq: frequency,
        interval: interval,
    });
    setRrule(newRrule)
    },[recurrence])


  const reservation = (
    <>
      <h1>
      </h1>
    </>
 )

  return (
    <>
        <RecurrenceDialog
          open={open}
          onClose={()=>setOpen(false)}
          recurrence={recurrence}
          handleRecurrenceChange={handleRecurrenceChange}/>
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
        <SplitButton
          mode={mode}
          setMode={setMode}
          setOpen={()=>{setOpen(true)}}
          options={["Reserve", "Fire Immediately"]}/>
    </>
  );
}
