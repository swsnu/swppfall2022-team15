import {EndingConditionType, FrequencyType, Recurrence, RecurrenceType} from "./index";
import {Dialog} from "@mui/material";
import Button from "@mui/material/Button";

interface IProps {
    open: boolean;
    onClose: () => void;
    handleRecurrenceChange: (recurrence: RecurrenceType) => void;
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

    const handleClickConfirm = () => {
    }

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <Recurrence
                recurrence={defaultRecurrence}
                onChange={props.handleRecurrenceChange}
            />
            <Button data-testid={"create-button"} onClick={handleClickConfirm}>Confirm</Button>
        </Dialog>
    )
}

export default RecurrenceDialog;