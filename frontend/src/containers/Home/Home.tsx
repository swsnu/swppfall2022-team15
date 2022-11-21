import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Home.css";
import GridLayout from "./GridView/ProjectGridView";
import NotiPieChart from "./PieChart/PieChart";
import RecentThree from "./RecentThree/RecentThree";
import Upcoming from "./Upcoming/Upcoming";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import { authSelector } from "../../store/slices/auth";
import { fetchProjects } from "../../store/slices/project";
import { projectListSelector } from "../../store/slices/project";
import { AppDispatch } from "../../store";
import { fetchNotifcations } from "../../store/slices/notifications";

//Todo: create mock data for notifications
//Todo: implement recently sent notifications list
//Todo: implement upcoming notifications list

export default function Home() {
  const user = useSelector(authSelector);
  const projectsState = useSelector(projectListSelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProjects());
    //Todo: fetch notifications
    //dispatch(fetchNotifcations());
    
  }, [user]);

  return (
    <div className="Home">
      <Scrollbar>
        <div className="flex-container">
          <div className="flex-item">
            <div className="projects">
              <div className="sublevel">
                <div className="title">Projects</div>
                <div className="project">
                  <GridLayout projects={projectsState} />
                </div>
              </div>
            </div>
            <div className="sentNotis">
              <div className="sublevel">
                <div className="title_noti">Recently Sent Notifications</div>
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
          <div className="flex-item">
            <div className="upcoming">
              <div className="sublevel">
                <div>
                  <div className="upcomingNoti">
                    <Upcoming upcomingNotifications={[]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scrollbar>
    </div>
  );
}
