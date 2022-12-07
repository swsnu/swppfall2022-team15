import { Grid } from '@material-ui/core';
import { useSelector } from "react-redux";
import { green, red, blue } from "@mui/material/colors";

import BarLineChart from "./BarLineAnalytics";
import PieChart from "./PieChart";
import { projectListSelector, projectSelect } from "../../../store/slices/project";

interface IProps {
  selectedTab: number;
  selectedProject: number;
  selectedType: number;
}

const types = ["Slack", "Email", "HTTP", "SMS"];

export default function Charts(props: IProps) {
  const projects = useSelector(projectListSelector);
  const selectedProject = useSelector(projectSelect);

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
    return shortenNumber(0);
  }

  function getNumberByProject() {
    return shortenNumber(0);
  }

  function getNumberByType() {
    return shortenNumber(0);
  }

  function getTotal() {
    return 0;
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
      <Grid item xs={12} sm={7} md={7}>
        <BarLineChart title="Notification requests" subtitle={getSubtitle()} />
      </Grid>
      <Grid item xs={12} sm={7} md={5}>
        <PieChart
          title={getTitle()}
          subheader={getSubheader()}
          series={[0, 0, 0]}
          labels={["Success", "Failure", "Upcoming"]}
          colors={[green[300], red[300], blue[300]]}
          total={getTotal()}
        />
      </Grid>
    </>
  );
}
