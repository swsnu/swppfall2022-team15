import {EndingConditionType, FrequencyType, Recurrence, RecurrenceType} from "./Recurrence";
import {useState} from "react";
import {Dialog} from "@mui/material";

interface IProps {
    open: boolean;
    onClose: () => void;
}

const RecurrenceDialog = (props: IProps) => {

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
        <Dialog open={props.open} onClose={props.onClose}>
            <Recurrence
                recurrence={recurrence}
                onChange={handleRecurrenceChange}
            />
        </Dialog>
    )
}

export default RecurrenceDialog;