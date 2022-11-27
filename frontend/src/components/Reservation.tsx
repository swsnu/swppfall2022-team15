import {EndingConditionType, FrequencyType, Recurrence, RecurrenceType} from "./Recurrence";
import {useState} from "react";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Demo = () => {

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

    const [recurrence, setRecurrence] = useState<RecurrenceType>(defaultRecurrence)

    const handleRecurrenceChange = (updatedRecurrence: RecurrenceType) => {
        setRecurrence(updatedRecurrence)
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Recurrence
                recurrence={recurrence}
                onChange={handleRecurrenceChange}
            />
        </MuiPickersUtilsProvider>
    )
}

export default Demo;