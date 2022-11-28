import {MenuItem, Select} from "@mui/material";
import {EnumNotificationType, EnumProjectType} from "../../Enums";
import {useSelector} from "react-redux";
import {projectSelect} from "../../store/slices/project";


interface IProps {
    notificationType: string;
    onChange: (notificationType: EnumNotificationType) => void;
}

export default function NotificationTypeForm(props: IProps) {
    const projectState = useSelector(projectSelect);

    return (
        <>
            <Select
                fullWidth={true}
                onChange={(e) => {props.onChange(e.target.value as EnumNotificationType)}}
            >
                {projectState.selectedProject?.project_type === EnumProjectType.INDIVIDUAL &&
                    (<>
                        <MenuItem value={EnumNotificationType.EMAIL}>EMAIL</MenuItem>
                        <MenuItem value={EnumNotificationType.SMS}>SMS</MenuItem>
                        <MenuItem value={EnumNotificationType.SLACK}>SLACK</MenuItem>
                    </>
                    )
                }
                {
                    projectState.selectedProject?.project_type === EnumProjectType.ORGANIZATION &&
                    (
                        <>
                            <MenuItem value={EnumNotificationType.API}>API</MenuItem>
                        </>
                    )
                }
            </Select>
        </>
    )
}