import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";

import Iconify from "../../../components/Iconify/Iconify";
import { projectListSelector } from "../../../store/slices/project";
import Charts from "./Charts";

const types = ["Slack", "Email", "HTTP", "SMS"];

export default function Analytics() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedProject, setSelectedProject] = useState(0);
  const [selectedType, setSelectedType] = useState(0);
  const projects = useSelector(projectListSelector);

  function renderTabs() {
    if (selectedTab === 0) {
      return <></>;
    } else if (selectedTab === 1) {
      return (
        <Tabs
          value={selectedProject}
          onChange={(event, newValue) => setSelectedProject(newValue)}
        >
          {projects.map((project, index) => (
            <Tab key={index} label={project.name} />
          ))}
        </Tabs>
      );
    } else if (selectedTab === 2) {
      return (
        <Tabs
          value={selectedType}
          onChange={(event, newValue) => setSelectedType(newValue)}
        >
          {types.map((type, index) => (
            <Tab key={index} label={type} />
          ))}
        </Tabs>
      );
    }
  }

  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={(event, newValue) => {
          setSelectedTab(newValue);
        }}
        className="Home_tabs"
      >
        <Tab label="All" icon={<Iconify icon="mdi:home" />} />
        <Tab label="By Project" icon={<Iconify icon="eos-icons:project" />} />
        <Tab
          label="By Type"
          icon={<Iconify icon="mdi:format-list-bulleted-type" />}
        />
      </Tabs>

      {renderTabs()}

      <Grid container spacing={3} className="Home_analytics">
        <Charts
          selectedTab={selectedTab}
          selectedProject={selectedProject}
          selectedType={selectedType}
        />
      </Grid>
    </>
  );
}
