import "./Home.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GridLayout from "./GridView/ProjectGridView";
import NotiPieChart from "./PieChart/PieChart";
import RecentThree from "./RecentThree/RecentThree";
import Upcoming from "./Upcoming/Upcoming";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import { authSelector } from "../../store/slices/auth";
import { fetchProjects } from "../../store/slices/project";
import { AppDispatch } from "../../store";
import ProjectCreateModal from "../../components/project/ProjectCreateModal";
import List from "./ListView/ProjectListView";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";

export default function Home() {
  const user = useSelector(authSelector);
  const dispatch = useDispatch<AppDispatch>();

  // Grid 아니면 List 형태로 Project List를 보여줌
  const [projectStyle, setProjectStyle] = useState("");
  // ProjectStyle이 Grid인 경우
  const isGridStyle = projectStyle === "Grid";

  const [createModalopen, setCreateModalOpen] = useState(false);

  const handleNewProjectClick = (event: React.MouseEvent) => {
    setCreateModalOpen(true);
  };

  // Grid 아니면 List 형태로 Project List를 보여주는데 이에 대한 처리
  const handleStyleChange = (event: React.SyntheticEvent) => {
    setProjectStyle(
      (event.target as HTMLInputElement).checked ? "List" : "Grid"
    );
  };

  useEffect(() => {
    dispatch(fetchProjects());
    //Todo: fetch notifications
    //dispatch(fetchNotifcations());
  }, [user]);

  return (
    <>
      {/* Project 생성 Modal (만약 New Project를 클릭하는 경우) */}
      <ProjectCreateModal
        open={createModalopen}
        handleClose={() => setCreateModalOpen(false)}
      ></ProjectCreateModal>
      <div className="Home">
        <Scrollbar>
          <div className="container">
            <div className="grid-column">
              <div className="projects">
                <div className="sublevel">
                  <div className="title">
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={3}
                    >
                      <h2>Projects</h2>
                      <FormControl>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography>Grid</Typography>
                          <Switch
                            defaultChecked
                            value={projectStyle}
                            onChange={handleStyleChange}
                            data-testid="switch"
                          />
                          <Typography>List</Typography>
                        </Stack>
                      </FormControl>
                      <Button
                        endIcon={<CreateNewFolderIcon />}
                        onClick={handleNewProjectClick}
                      >
                        New Project
                      </Button>
                    </Stack>
                  </div>
                  <div className="project">
                    {isGridStyle ? (
                      <GridLayout/>
                    ) : (
                      <List/>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid-column">
              <div className="upcoming">
                <div className="sublevel">
                  <div>
                    <div className="upcomingNoti">
                      <Upcoming upcomingNotifications={[]} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sentNotis">
                <div className="sublevel">
                  <div className="titleNoti">Recently Sent Notifications</div>
                  <div>
                    <div className="noti">
                      <NotiPieChart notifications={[]} />
                    </div>
                    <div className="recentThree">
                      <RecentThree notifications={[]} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Scrollbar>
      </div>
    </>
  );
}
