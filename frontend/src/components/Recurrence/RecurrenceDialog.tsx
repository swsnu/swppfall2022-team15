import {EndingConditionType, FrequencyType, Recurrence, RecurrenceType} from "./index";
import {Dialog} from "@mui/material";
import Button from "@mui/material/Button";

interface IProps {
    open: boolean;
    onClose: () => void;
    recurrence: RecurrenceType;
    handleRecurrenceChange: (recurrence: RecurrenceType) => void;
}

const RecurrenceDialog = (props: IProps) => {
    const handleClickConfirm = () => {
        props.onClose();
    }

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <Recurrence
                recurrence={props.recurrence}
                onChange={props.handleRecurrenceChange}
            />
            <Button data-testid={"create-button"} onClick={handleClickConfirm}>Confirm</Button>
        </Dialog>
    )
}

export default RecurrenceDialog;
