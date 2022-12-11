import { Card, CardHeader, Box, Grid, Paper, Typography } from "@mui/material";

import "./Today.css";
import Iconify from "../../../components/Iconify/Iconify";
import BarLineToday from "./BarLineToday";
import { useSelector } from "react-redux";
import { notificationListSelector } from "../../../store/slices/notifications";
import { projectListSelector } from "../../../store/slices/project";
import { todaySelect } from "../../../store/slices/today";

export default function Today() {
  const notifications = useSelector(notificationListSelector);
  const projects = useSelector(projectListSelector);
  const today = useSelector(todaySelect);

  function getRate() {
    if (notifications.length === 0) {
      return "0%";
    } else {
      let success = 0;
      let fail = 0;
      
      var i;
      for(i = 0; i < notifications.length; i++) {
        if (notifications[i].status === "SUCCESS") {
          success++;
        } else {
          fail++;
        }
      };
      return `${Math.round((success / (success + fail)) * 100)}%`;
    }
  }

  function getToday() {
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return today.toLocaleDateString();
  }

  function getProjectWithMostRequests() {
    if (projects.length === 0) {
      return "No Projects yet";
    } else {
      if (notifications.length === 0) {
        return "No notifications yet";
      } else {
        //TODO
        return "TODO";
      }
    }
  }

  function getMostUsedChannel() {
    if (notifications.length === 0) {
      return "No notifications yet";
    } else {
      return "TODO";
    }
  }

  function getMostActiveTime() {
    if (notifications.length === 0) {
      return "No notifications yet";
    } else {
      const start = Number(today.mostActive.time);
      const end = start + 1;
      const format = `${start}h ~ ${end}h`;
      return format;
    }
  }

  function getMostRecentFailure() {
    if (notifications.length === 0) {
      return "No notifications yet";
    } else {
      //TODO
      return "TODO";
    }
  }

  return (
    <Grid container spacing={2} className="Today">
      <Grid item xs={12} sm={12} md={12} lg={5}>
        <Card>
          <CardHeader title="Requests Today" subheader="00:00 ~ 23:59 KST" />
          <Box dir="ltr">
            <BarLineToday />
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={7}>
        <Card>
          <CardHeader title="Daily Statistics" />

          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  key="Date"
                  variant="outlined"
                  sx={{
                    py: 2.5,
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ mb: 0.5 }}>
                    <Iconify icon="clarity:date-line" />
                  </Box>
                  <Typography variant="h6">{getToday()}</Typography>
                  <Typography variant="body2">Date Today</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  key="Success"
                  variant="outlined"
                  sx={{
                    py: 2.5,
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ mb: 0.5 }}>
                    <Iconify icon="mdi:check" />
                  </Box>
                  <Typography variant="h6">{getRate()}</Typography>
                  <Typography variant="body2">Success Rate</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  key="BiggestProject"
                  variant="outlined"
                  sx={{
                    py: 2.5,
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ mb: 0.5 }}>
                    <Iconify icon="ic:sharp-vertical-align-top" />
                  </Box>
                  <Typography variant="h6">
                    {getProjectWithMostRequests()}
                  </Typography>
                  <Typography variant="body2">Most requests</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  key="MostUsed"
                  variant="outlined"
                  sx={{
                    py: 2.5,
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ mb: 0.5 }}>
                    <Iconify icon="mdi:bell-ring" />
                  </Box>
                  <Typography variant="h6">{getMostUsedChannel()}</Typography>
                  <Typography variant="body2">Most used channel</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  key="MostActive"
                  variant="outlined"
                  sx={{
                    py: 2.5,
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ mb: 0.5 }}>
                    <Iconify icon="ic:round-access-time" />
                  </Box>
                  <Typography variant="h6">{getMostActiveTime()}</Typography>
                  <Typography variant="body2">Most active time</Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  key="MostRecent"
                  variant="outlined"
                  sx={{
                    py: 2.5,
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ mb: 0.5 }}>
                    <Iconify icon="ic:baseline-sms-failed" />
                  </Box>
                  <Typography variant="h6">{getMostRecentFailure()}</Typography>
                  <Typography variant="body2">Most recent failure</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
