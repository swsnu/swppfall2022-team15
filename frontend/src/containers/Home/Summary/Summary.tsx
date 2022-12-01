import Scrollbar from "../../../components/scrollbar/Scrollbar";
import GridLayout from "../GridView/ProjectGridView";
import NotiPieChart from "../PieChart/PieChart";
import RecentThree from "../RecentThree/RecentThree";
import Upcoming from "../Upcoming/Upcoming";
import List from "../ListView/ProjectListView";
import ProjectCreateModal from "../../../components/project/ProjectCreateModal";

import { Stack, FormControl, Typography, Switch, Button } from "@mui/material";
import CreateNewFolder from "@mui/icons-material/CreateNewFolder";
import { useState } from "react";

export default function Summary() {
  const [isGridStyle, setIsGridStyle] = useState(true);
  const [createModalopen, setCreateModalOpen] = useState(false);

  const handleNewProjectClick = (event: React.MouseEvent) => {
    setCreateModalOpen(true);
  };

  return (
    <>
      <ProjectCreateModal
        open={createModalopen}
        handleClose={() => setCreateModalOpen(false)}
      ></ProjectCreateModal>
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
                          onChange={() => setIsGridStyle(!isGridStyle)}
                          data-testid="switch"
                        />
                        <Typography>List</Typography>
                      </Stack>
                    </FormControl>
                    <Button
                      endIcon={<CreateNewFolder />}
                      data-testid="new-project-button"
                      onClick={handleNewProjectClick}
                    >
                      New Project
                    </Button>
                  </Stack>
                </div>
                <div className="project">
                  {isGridStyle ? (
                    <GridLayout data-testid="grid" />
                  ) : (
                    <List data-testid="list" />
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
    </>
  );
}
