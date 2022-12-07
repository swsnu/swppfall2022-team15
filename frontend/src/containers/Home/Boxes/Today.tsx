import { Card, CardHeader, Box, Grid, Paper, Typography } from "@mui/material";

import "./Today.css"
import Iconify from "../../../components/Iconify/Iconify";
import BarLineToday from "./BarLineToday";

export default function Today() {
  function getRate() {

    return "90%";
  }

  function getToday() {
    let today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return today.toLocaleDateString();
  }

  function getProjectWithMostRequests() {
    return "Project 1";
  }

  function getMostUsedChannel() {
    return "Slack";
  }

  function getMostActiveTime() {
    return "5PM ~ 6PM";
  }

  function getMostRecentFailure() {
    return "Failed Message";
  }

  return (
    <Grid container spacing={2} className="Today">
      <Grid item xs={12} sm={6} md={7} lg={8}>
        <Card>
          <CardHeader title="Requests Today" subheader="00:00 ~ 23:59 KST" />
          <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <BarLineToday />
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={5} lg={6}>
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
