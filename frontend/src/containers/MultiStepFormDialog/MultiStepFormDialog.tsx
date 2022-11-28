import {Dialog} from "@mui/material";
import MultiStepForm from "../MultiStepForm/MultiStepForm";

interface IProps {
    open: boolean;
    onClose: () => void;
}

export default function MultiStepFormDialog(props: IProps) {
    return (
        <>
            <Dialog open={props.open} onClose={props.onClose}>
                <MultiStepForm />
            </Dialog>
        </>
    )
}