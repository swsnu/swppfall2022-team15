import "./Home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button } from "@mui/material";
import { Grid } from "@material-ui/core";
import { green, grey, red, indigo } from "@mui/material/colors";

import Widget from "./Boxes/Widget";
import Analytics from "./Boxes/Analytics";
import Today from "./Boxes/Today";
import { AppDispatch } from "../../store";
import { authSelector } from "../../store/slices/auth";
import { fetchTargets, targetListSelector } from "../../store/slices/target";
import { fetchProjects, projectListSelector } from "../../store/slices/project";
import {
  fetchAllNotifications,
  notificationListSelector,
} from "../../store/slices/notifications";
import Scrollbar from "../../components/Scrollbar/Scrollbar";
import axios from "axios";
import { getDate } from "date-fns";

export default function Home() {
  const projects = useSelector(projectListSelector);
  const targets = useSelector(targetListSelector);
  const notifications = useSelector(notificationListSelector);

  const user = useSelector(authSelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchAllNotifications());
    dispatch(fetchTargets());
  }, [user, dispatch]);

  const handleClickCreateButton = (event: React.MouseEvent) => {
    //Todo: open notification create
  };

  const getTodayStart = () => {
    const time = new Date();

    let formattedDate = `${time.getFullYear()}-${
      time.getMonth() + 1
    }-${time.getDate()} 00:00:00`;
    return formattedDate;
  };

  const getTodayEnd = () => {
    const time = new Date();

    let formattedDate = `${time.getFullYear()}-${
      time.getMonth() + 1
    }-${time.getDate()} 23:59:59`;
    return formattedDate;
  };

  /*
  const getSuccessfulNotifications = async () => {
    try {
      await axios.get{
        //`/api/notification/metrics/?start=${getDate(new Date())}&end=${getDate(new Date())}&interval=${hour}`
      }
    } catch (error) {
      console.log(error);
    }
  }
  */

  return (
    <Scrollbar>
      <Container maxWidth="xl" className="Home">
        <Grid container justifyContent="space-between">
          <Grid item>
            <h2>{"Overview"}</h2>
          </Grid>
          <Grid item className="Home_button">
            <Button
              data-testid="create-button"
              onClick={handleClickCreateButton}
            >
              Send Notification
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Widget
              icon="eos-icons:project"
              title="Projects"
              subtitle="Number of projects"
              value={projects.length}
              color_main={grey[500]}
              color_dark={grey[600]}
              color_light={grey[400]}
              color_darker={grey[900]}
              color_lighter={grey[200]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Widget
              icon="wpf:sent"
              title="Total"
              subtitle="Total notification requests"
              value={notifications.length}
              color_main={indigo[500]}
              color_dark={indigo[600]}
              color_light={indigo[400]}
              color_darker={indigo[900]}
              color_lighter={indigo[200]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Widget
              icon="mdi:check"
              title="Success"
              subtitle="Successful notification requests today"
              value={0}
              color_main={green[500]}
              color_dark={green[600]}
              color_light={green[400]}
              color_darker={green[900]}
              color_lighter={green[200]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Widget
              icon="mdi:exclamation-thick"
              title="Failure"
              subtitle="Failed notification requests today"
              value={0}
              color_main={red[500]}
              color_dark={red[600]}
              color_light={red[400]}
              color_darker={red[900]}
              color_lighter={red[200]}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Today />
          </Grid>
        </Grid>
        <h2>Analytics</h2>
        <Analytics />
      </Container>
    </Scrollbar>
  );
}
