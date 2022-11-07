import { useParams } from "react-router";
import CollapsibleTable, { IProps } from "../table/CollapsibleTable";
import { EnumNotificationStatus } from "../../enums";
import { NotificationType } from "../../types";

export default function ProjectDetail() {
  const {projectId} = useParams();

  // get project details from backend
  // const project = getProject(projectId);   

  // handler
  const projectData: NotificationType[] = [
    {
      id: 1,
      status: EnumNotificationStatus["SUCCESS"],
      message: "data", // FIXME(Given) add some data
      reservedAt: "2021-10-10 10:10:10",
      // history: []
    }
  ]

  return (
    <CollapsibleTable notifications={projectData} />
  )
};