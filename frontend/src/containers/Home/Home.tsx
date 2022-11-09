import "./Home.css";
import { EnumProjectType, EnumNotificationStatus } from "../../Enums";
import { ProjectType, NotificationType } from "../../types";
import Grid from "../../components/GridView/ProjectGridView";
import NotiPieChart from "./PieChart/PieChart";
import RecentThree from "./RecentThree/RecentThree";
import Upcoming from "./Upcoming/Upcoming";

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

const mockNotificationData: {
    notifications: NotificationType[];
} = {
    notifications: [
        {
            id: 1,
            message: "2022 November Monthly Newsletter",
            status: EnumNotificationStatus.SUCCESS,
            reservedAt: "2022-10-31 22:00:00",
        },
        {
            id: 2,
            message: "Nov 2, 2022, Daily Newsletter",
            status: EnumNotificationStatus.SUCCESS,
            reservedAt: "2022-11-01 22:00:00",
        },
        {
            id: 3,
            message: "Nov 3, 2022, Daily Newsletter",
            status: EnumNotificationStatus.SUCCESS,
            reservedAt: "2022-11-02 22:00:00",
        },
        {
            id: 4,
            message: "Nov 4, 2022, Daily Newsletter",
            status: EnumNotificationStatus.FAILURE,
            reservedAt: "2022-11-03 22:00:00",
        },
        {
            id: 5,
            message: "Have A Nice Weekend! - SNU CSE",
            status: EnumNotificationStatus.SUCCESS,
            reservedAt: "2022-11-04 22:00:00",
        },
        {
            id: 6,
            message: "Have A Nice Weekend! - SNU Engineering",
            status: EnumNotificationStatus.FAILURE,
            reservedAt: "2022-11-04 22:00:00",
        },
        {
            id: 7,
            message: "Weekly Newsletter",
            status: EnumNotificationStatus.SUCCESS,
            reservedAt: "2022-11-06 22:00:00",
        },
        {
            id: 8,
            message: "Weekly Newsletter",
            status: EnumNotificationStatus.SUCCESS,
            reservedAt: "2022-11-06 22:00:00",
        },
        {
            id: 9,
            message: "Nov 7, 2022, Daily Newsletter",
            status: EnumNotificationStatus.SUCCESS,
            reservedAt: "2022-11-06 22:00:00",
        },
        {
            id: 10,
            message: "Nov 8, 2022, Daily Newsletter",
            status: EnumNotificationStatus.FAILURE,
            reservedAt: "2022-11-07 22:00:00",
        },
        {
            id: 11,
            message: "Today's class is Cancelled",
            status: EnumNotificationStatus.SUCCESS,
            reservedAt: "2022-11-07 22:00:00",
        },
    ]
}

//Todo: create mock data for notifications
//Todo: implement recently sent notifications list
//Todo: implement upcoming notifications list


export default function Home() {
    return (
        <div className="Home">
            <div className="flex-container">
                <div className="flex-item">
                    <div className="projects">
                        <div className="sublevel">
                            <div className="title">
                                Projects
                            </div>
                            <div className="project">
                                <Grid projects={mockProjectData.projects} />
                            </div>
                        </div>
                    </div>
                    <div className="sentNotis">
                        <div className="sublevel">
                            <div className="title_noti">
                                Recently Sent Notifications
                            </div>
                            <body>
                                <div className="noti"> 
                                    <NotiPieChart notifications={mockNotificationData.notifications}/>
                                </div>
                                <div className="recentThree">
                                    <RecentThree notifications={mockNotificationData.notifications}/>
                                </div>
                            </body>
                        </div>
                    </div>
                </div>
                <div className="flex-item">
                    <div className="upcoming">
                        <div className="sublevel">
                            <body>
                                <div className="upcomingNoti">
                                    <Upcoming upcomingNotifications={[]}/>
                                </div>
                            </body>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

    )
}