import "./Home.css";
import { EnumProjectType } from "../../Enums";
import { ProjectType } from "../../types";
import Grid from "../../components/GridView/ProjectGridView";
import NotiPieChart from "../../components/PieChart/PieChart";

const mockProjectData: {
    projects: ProjectType[];
    selectedProject: ProjectType | null;
} = {
    selectedProject: {
        id: 1,
        project_type: EnumProjectType.ORGANIZATION,
        name: "SNU",
    },
    projects: [
        {
            id: 1,
            project_type: EnumProjectType.ORGANIZATION,
            name: "SNU",
        },
        {
            id: 2,
            project_type: EnumProjectType.ORGANIZATION,
            name: "SNU_Engineering",
        },
        {
            id: 3,
            project_type: EnumProjectType.ORGANIZATION,
            name: "SNU_ComputerScience",
        },
        {
            id: 4,
            project_type: EnumProjectType.INDIVIDUAL,
            name: "SNU_Staff1",
        },
        {
            id: 5,
            project_type: EnumProjectType.INDIVIDUAL,
            name: "SNU_Student1",
        },
        {
            id: 6,
            project_type: EnumProjectType.INDIVIDUAL,
            name: "SNU_Student2",
        },

    ]
}


export default function Home() {
    return (
        <div className="Home">
            <div className="projects">
                Projects
                <div className="project">
                    <Grid projects={mockProjectData.projects} />
                </div>
            </div>

            <div className="sentNotis">
                Recently Sent Notifications
                <div className="sentNoti">
                    <NotiPieChart notifications={[]} />
                </div>
            </div>
        </div>
    )
}