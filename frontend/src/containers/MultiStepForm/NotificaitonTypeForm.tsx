import {MenuItem, Select} from "@mui/material";
import {EnumNotificationType, EnumProjectType} from "../../Enums";
import {useSelector} from "react-redux";
import {projectSelect} from "../../store/slices/project";


interface IProps {
    notificationType: string;
    setNotificationType: (notificationType: string) => void;
}

export default function NotificationTypeForm(props: IProps) {
    const projectState = useSelector(projectSelect);

    if (projectState.selectedProject?.project_type === EnumProjectType.INDIVIDUAL) {
        return (
            <Select
                fullWidth={true}
                value={props.notificationType}
                onChange={event => props.setNotificationType(event.target.value as string)}
            >
                <MenuItem value={EnumNotificationType.EMAIL}>EMAIL</MenuItem>
                <MenuItem value={EnumNotificationType.SMS}>SMS</MenuItem>
                <MenuItem value={EnumNotificationType.SLACK}>SLACK</MenuItem>
            </Select>
        )
    } else {
        return (
            <Select
                fullWidth={true}
                value={props.notificationType}
                onChange={event => props.setNotificationType(event.target.value as string)}
            >
                <MenuItem value={EnumNotificationType.API}>API</MenuItem>
            </Select>
        )
    }
};