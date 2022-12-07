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
import DynamicTable from "../../components/Message/DynamicTable";
import {projectSelect} from "../../store/slices/project";
import {createNotificationConfig, createReservation} from "../../services/reservation";

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
  const messageForm = MessageForm({notificationType, name: message.name, setName:(x: string)=>{}, data: message.data, setData:(_: string )=>{}, fieldErrors: {}, setFieldErrors: (_: any) => {}}, true);
  const targetState = useSelector(targetSelect);

  const sendCreateNotificationCreateRequest = async () => {
    const config = {
      projectId: projectId,
      type: notificationType,
      message: message.id,
    };
    return await createNotificationConfig(config)
  }

  const sendCreateReservationRequest = async (id: number) => {
      const reservation = {
          notification_config_id: id,
          rruleString: rrule?.toString(),
          target_users: targetUsers.map(x => x.id),
      }
      await createReservation(reservation)
  }

  const getTargetColumns = (notificationType: string ) => {
    switch(notificationType) {
        case "SLACK":
          return ['Id', 'Name', 'API-KEY']
        case "EMAIL":
          return ['Id', 'Name', 'ADDRESS']
        case "SMS":
          return ['Id', 'Name', 'PHONE NUMBER', 'COUNTRY CODE']
        case "WEBHOOK":
          return ['Id', 'Name', 'URL', 'AUTH']
    }
    return [""]
  }

  const getTargetRows = (notificationType: string ) => {
    switch(notificationType) {
      case "SLACK":
        return ['id', 'name', 'data.api_key']
      case "EMAIL":
        return ['id', 'name', 'endpoint']
      case "SMS":
        return ['id', 'name', 'endpoint', 'data.country_code']
      case "WEBHOOK":
        return ['id', 'name', 'endpoint', 'data.auth']
    }
    return [""]
  }


    // runtime 에 데이터가 바뀜. mutable.
    const targetUsers = targetState.targets.filter((target) => targetUserIds.map((targetUser) => targetUser.value).includes(target.id));
    const columns = getTargetColumns(notificationType);
    const keys = getTargetRows(notificationType);

    const targetTable = DynamicTable(
        {columns, keys, rows: targetUsers, handleOpenMenu: null}
    )


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
    const [rrule, setRrule] = useState<RRule | null>(null);
    const handleRecurrenceChange = async (recurrenceType: RecurrenceType) => {
      setRecurrence(recurrenceType)
      const id = await sendCreateNotificationCreateRequest()
      await sendCreateReservationRequest(id)

  }
    const [mode, setMode] = useState("")

 /*
 data hinders encapsulation
 everywhere, data can be mutated.
 so logic placement is not bound to the "concerns".
 anywhere you go. since data is reactive
 * */

  // useEffect(() => {
  //   // setRrule(newRrule)
  //   },[recurrence])


  const reservation = (
    <>
      <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "sms-name-input" }}
            value={rrule?.toString()}
            // rows={1}
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
        {targetTable}
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
