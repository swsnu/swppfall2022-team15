import { Tabs, Tab, Grid } from "@mui/material";
import { useState } from "react";


import Iconify from "../../../components/iconify/Iconify";


export default function Analytics() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={(event, newValue) => {
          setSelectedTab(newValue);
        }}
      >
        <Tab
          label="All"
          icon={<Iconify icon="mdi:check" iconPosition="start" />}
        />
        <Tab
          label="Slack"
          icon={<Iconify icon="la:slack" iconPosition="start" />}
        />
        <Tab
          label="Email"
          icon={<Iconify icon="ic:outline-email" iconPosition="start" />}
        />
        <Tab
          label="Http"
          icon={
            <Iconify icon="material-symbols:webhook" iconPosition="start" />
          }
        />
        <Tab
          label="SMS"
          icon={<Iconify icon="ic:baseline-sms" iconPosition="start" />}
        />
      </Tabs>

      
    </>
  );
}
