import "./Home.css";
import {EnumProjectType} from "../../Enums";
import {ProjectType} from "../../types";
import AppWebsiteVisits from "../../components/Chart/AppWebsiteVisit";
import {Card, Grid} from "@mui/material";
import {Container} from "@mui/system";
import AppWidgetSummary from "../../components/Chart/AppWidgetSummary";

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

//Todo: create mock data for notifications
//Todo: implement recently sent notifications list
//Todo: implement upcoming notifications list


export default function Home() {
    return (
        <>
            <Container sx={{'margin-top': 150}}>
                <Card>
                    <AppWebsiteVisits
                        title="Success/Failure Rate"
                        subheader=""
                        chartLabels={[
                            '01/01/2003',
                            '02/01/2003',
                            '03/01/2003',
                            '04/01/2003',
                            '05/01/2003',
                            '06/01/2003',
                            '07/01/2003',
                            '08/01/2003',
                            '09/01/2003',
                            '10/01/2003',
                            '11/01/2003',
                        ]}
                        chartData={[
                            {
                                name: 'Project A',
                                type: 'column',
                                fill: 'solid',
                                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                            },
                            {
                                name: 'Project B',
                                type: 'area',
                                fill: 'gradient',
                                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                            },
                            {
                                name: 'Project C',
                                type: 'line',
                                fill: 'solid',
                                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                            },
                        ]}
                    />
                </Card>
                {/*<Grid container spacing={3}>*/}
                {/*    <Grid item xs={12} sm={6} md={3}>*/}
                {/*        <AppWidgetSummary sx={1} title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />*/}
                {/*    </Grid>*/}

                {/*   /!* <Grid item xs={12} sm={6} md={3}>*!/*/}
                {/*   /!*     <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />*!/*/}
                {/*   /!* </Grid>*!/*/}

                {/*   /!*<Grid item xs={12} sm={6} md={3}>*!/*/}
                {/*   /!*  <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />*!/*/}
                {/*   /!* </Grid>*!/*/}

                {/*   /!* <Grid item xs={12} sm={6} md={3}>*!/*/}
                {/*   /!*     <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />*!/*/}
                {/*   /!* </Grid>*!/*/}
                {/*</Grid>*/}

                {/*<div className="Home">*/}
                {/*    <div className="projects">*/}
                {/*        <div className="title">*/}
                {/*            Projects*/}
                {/*        </div>*/}
                {/*        <div className="project">*/}
                {/*            <Grid projects={mockProjectData.projects} />*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className="sentNotis">*/}
                {/*        Recently Sent Notifications*/}
                {/*        <div className="sentNoti">*/}
                {/*            <NotiPieChart notifications={[]} />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </Container>
        </>
    )
}