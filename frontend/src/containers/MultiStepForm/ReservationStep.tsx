import {useState} from "react";
import {MessageType, TargetUserIdNameDto} from "../../types";
import SplitButton from "../../components/SplitButton/SplitButton";
import RecurrenceDialog from "../../components/Recurrence/RecurrenceDialog";
import {EndingConditionType, FrequencyType, RecurrenceType} from "../../components/Recurrence";
import MessageForm from "../../components/Message/MessageForm";
import {Button, Grid, TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {targetSelect} from "../../store/slices/target";
import {RRule} from "rrule";
import DynamicTable from "../../components/Message/DynamicTable";
import {projectSelect} from "../../store/slices/project";
import {createNotificationConfig} from "../../services/notifications";
import {getTargetColumns, getTargetKeys} from "../../components/Message/utils/dyanamicTableUtils";

interface IProps {
  notificationType: string;
  message: MessageType;
  targetUserIds: TargetUserIdNameDto[];
}

export default function ReservationStep(props: IProps) {
  const {notificationType, message, targetUserIds} = props;
  const [open, setOpen] = useState(false);

  const projectState = useSelector(projectSelect);
  const projectId = projectState.selectedProject?.id
  let messageForm
  if (message) {
    messageForm = MessageForm({notificationType, name: message.name, setName:(x: string)=>{}, data: message.data, setData:(_: string )=>{}, fieldErrors: {}, setFieldErrors: (_: any) => {}}, true);
  } else {
    messageForm = <TextField
      id="outlined-multiline-static"
      fullWidth
      multiline
      value={"Message Not Selected"}
      rows={1}
      disabled
    />
  }

  const targetState = useSelector(targetSelect);

    // runtime 에 데이터가 바뀜. mutable.
  const targetUsers = targetState.targets.filter((target) => targetUserIds.map((targetUser) => targetUser.value).includes(target.id));
  const columns = getTargetColumns(notificationType);
  const keys = getTargetKeys(notificationType);

  let targets;
  if (targetUsers.length > 0) {
      targets = DynamicTable(
          {columns, keys, rows: targetUsers, handleOpenMenu: null}
      )
  } else {
      targets = <TextField
          id="outlined-multiline-static"
          fullWidth
          multiline
          value={"Target Not Selected"}
          rows={1}
          disabled
      />
  }

  const today = new Date()
  const defaultRecurrence = {
    startDate: today,
    frequency: FrequencyType.Weekly,
    numberOfRepetitions: 1,
    weekDaysRepetition: [],
    endingCondition: EndingConditionType.None,
    endingOccurrencesNumber: 0,
    endDate: today,
    isAllDay: false,
    startTime: today,
    endTime: today
 }
  const [recurrence, setRecurrence] = useState<RecurrenceType>(defaultRecurrence);
  const [rrule, setRrule] = useState<RRule | null>(null);
  const handleRecurrenceChange = async (recurrenceType: RecurrenceType) => {
    setRecurrence(recurrenceType)
  }
  const [mode, setMode] = useState("IMMEDIATE")
  const handleConfirm = async () => {
    if ( (!rrule && mode === 'RESERVATION') || !projectId) {
        return;
    }

    const config = {
      project: projectId,
      type: notificationType,
      rrule: rrule?.toString(),
      message: message.id,
      target_users: targetUsers.map((target) => target.id),
      mode: mode
    };
    await createNotificationConfig(config)
  }

  const reservation = (
    <>
      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        inputProps={{ "data-testid": "sms-name-input" }}
        value={rrule? rrule.toString() : "Reservation Not Selected"}
        disabled={true}
        required
      />
    <br/>
    <br/>
    <br/>
    </>
 )

  return (
    <>
        <RecurrenceDialog
          open={open}
          onClose={()=>setOpen(false)}
          recurrence={recurrence}
          handleRecurrenceChange={handleRecurrenceChange}
          setRrule={setRrule}/>
        {/* info */}
        <h2>Notification Type</h2>
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
        <h2>Message</h2>
        {messageForm}
        <br />
        <br />
        <br />
        <h2>TargetUser</h2>
        {targets}
        <br />
        <br />
        <br />

        <h2>Reservation</h2>
        {reservation}
        <Grid>
        <SplitButton
          mode={mode}
          setMode={setMode}
          setOpen={()=>{setOpen(true)}}
          options={["Reserve", "Fire Immediately"]}/>
        <Button onClick={handleConfirm}>Confirm</Button>
        </Grid>
    </>
  );
}
