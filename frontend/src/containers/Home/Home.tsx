import "./Home.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../store/slices/auth";
import { fetchProjects } from "../../store/slices/project";
import { AppDispatch } from "../../store";

import { Container, Tabs, Tab } from "@mui/material";
import Iconify from "../../components/iconify/Iconify";
import Summary from "./Summary/Summary";
import Analytics from "./Analytics/Analytics";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0);

  const user = useSelector(authSelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProjects());
    //Todo: fetch notifications
    //dispatch(fetchNotifcations());
  }, [user, dispatch]);

  function renderTab() {
    switch (selectedTab) {
      case 0:
        return <Summary/>

      case 1:
        return <Analytics/>

      default:
        return <div>Default</div>;
    }
  };

  return (
    <>
      <Container maxWidth="xl" className="Home">
        <Tabs
          value={selectedTab}
          onChange={(event, newValue) => {
            setSelectedTab(newValue);
          }}
        >
          <Tab label="Summary" icon={<Iconify icon="mdi:home" iconPosition="start" />} />
          <Tab label="Analytics" icon={<Iconify icon="mdi:chart-bar" iconPosition="start" />} />
        </Tabs>
        {renderTab()}
      </Container>
    </>
  );
}
