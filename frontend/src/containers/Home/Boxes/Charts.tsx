import { Grid } from '@material-ui/core';
import { useSelector } from "react-redux";
import { green, red, blue } from "@mui/material/colors";

import BarLineChart from "./BarLineAnalytics";
import PieChart from "./PieChart";
import { projectListSelector, projectSelect } from "../../../store/slices/project";
import { notificationListSelector } from '../../../store/slices/notifications';

interface IProps {
  selectedTab: number;
  selectedProject: number;
  selectedType: number;
}

const types = ["WEBHOOK", "Email", "SMS", "SLACK"];

export default function Charts(props: IProps) {
  const projects = useSelector(projectListSelector);
  const selectedProject = useSelector(projectSelect);
  const notifications = useSelector(notificationListSelector);

  function getSuccess() {
    var count = 0;
    for(let i = 0; i < notifications.length; i++) {
      if (notifications[i].status === "SUCCESS") {
        count++;
      }
    }

    return count;
  }

  function getFailure() {
    var count = 0;
    for(let i = 0; i < notifications.length; i++) {
      if (notifications[i].status === "FAILURE") {
        count++;
      }
    }

    return count;
  }

  function getUpcoming() {
    var count = 0;
    for(let i = 0; i < notifications.length; i++) {
      if (notifications[i].status === "PENDING") {
        count++;
      }
    }

    return count;
  }

  function getTitle() {
    if (props.selectedTab === 0) {
      return "Notification status";
    } else if (props.selectedTab === 1) {
      return (
        "Notification status (" +
        projects[props.selectedProject]?.name +
        ")"
      );
    } else {
      return "Notification status (" + types[props.selectedType] + ")";
    }
  }

  function getSubheader() {
    if (props.selectedTab === 0) {
      return "Total notification requests: " + getAll();
    } else if (props.selectedTab === 1) {
      return "Total notification requests: " + getNumberByProject();
    } else {
      return "Total notification requests: " + getNumberByType();
    }
  }

  function getAll() {
    return shortenNumber(getTotal());
  }

  function getNumberByProject() {
    return shortenNumber(0);
  }

  function getNumberByType() {
    return shortenNumber(0);
  }

  function getTotal() {
    return getSuccess() + getFailure() + getUpcoming();
  }

  function shortenNumber(value: number) {
    if (value > 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    } else if (value > 1000) {
      return (value / 1000).toFixed(1) + "K";
    } else {
      return value;
    }
  }

  function getSubtitle() {
    if (props.selectedTab === 0) {
      return "Notification requests by time";
    } else if (props.selectedTab === 1) {
      return projects[props.selectedProject]?.name + " notification requests by time"
    } else {
      return types[props.selectedType] + " notification requests by time"
    }
  }

  return (
    <>
      <Grid item xs={12} sm={12} md={12} lg={5}>
        <BarLineChart title="Notification requests" subtitle={getSubtitle()} type={props.selectedTab}/>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={7}>
        <PieChart
          title={getTitle()}
          subheader={getSubheader()}
          series={[getSuccess(), getFailure(), getUpcoming()]}
          labels={["Success", "Failure", "Pending"]}
          colors={[green[300], red[300], blue[300]]}
          total={getTotal()}
        />
      </Grid>
    </>
  );
}
