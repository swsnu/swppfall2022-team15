import "./Home.css";
import Grid from "./GridView/ProjectGridView";
import NotiPieChart from "./PieChart/PieChart";
import RecentThree from "./RecentThree/RecentThree";
import Upcoming from "./Upcoming/Upcoming";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import preloadedState from "../../test-utils/mock_state";

//Todo: create mock data for notifications
//Todo: implement recently sent notifications list
//Todo: implement upcoming notifications list

export default function Home() {
  return (
    <div className="Home">
      <Scrollbar>
        <div className="flex-container">
          <div className="flex-item">
            <div className="projects">
              <div className="sublevel">
                <div className="title">Projects</div>
                <div className="project">
                  <Grid projects={[]} />
                </div>
              </div>
            </div>
            <div className="sentNotis">
              <div className="sublevel">
                <div className="title_noti">Recently Sent Notifications</div>
                <body>
                  <div className="noti">
                    <NotiPieChart notifications={preloadedState.notification.notifications} />
                  </div>
                  <div className="recentThree">
                    <RecentThree notifications={[]} />
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
                    <Upcoming upcomingNotifications={[]} />
                  </div>
                </body>
              </div>
            </div>
          </div>
        </div>
      </Scrollbar>
    </div>
  );
}
