import { Box, Button, MenuItem, Popover, Tab, Tabs } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Iconify from "../../components/Iconify/Iconify";
import TargetCreateModal from "../../components/Targets/TargetCreateModal";
import { deleteTarget } from "../../services/target";
import { AppDispatch } from "../../store";
import { fetchTargets, targetListSelector } from "../../store/slices/target";
import { Container } from "@mui/system";
import "./TargetList.css";
import DynamicTable from "../../components/Message/DynamicTable";

export default function TargetListTable() {
  const [open, setOpen]: [HTMLElement | null, any] = useState(null);
  const [createModalopen, setCreateModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClickDelete = async () => {
    const targetId = open!.dataset.id;
    await deleteTarget(Number(targetId));
    handleCloseMenu();
    dispatch(fetchTargets());
  };

  const handleClickCreateButton = (event: React.MouseEvent) => {
    setCreateModalOpen(true);
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTargets());
  }, [dispatch]);
  const targets = useSelector(targetListSelector);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "data-testid": `tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  console.log(targets);

  function renderTable() {
    if (selectedTab === 0) {
      return (
        <Box sx={{ "margin-bottom": "20px" }}>
          <DynamicTable
            data-testid="menu-button"
            columns={["Id", "Name", "API-KEY"]}
            keys={["id", "name", "data.api_key"]}
            rows={targets.filter(
              (target) => target.notification_type == "SLACK"
            )}
            handleOpenMenu={handleOpenMenu}
          />
        </Box>
      );
    } else if (selectedTab === 1) {
      return (
        <Box sx={{ "margin-bottom": "20px" }}>
          <DynamicTable
            data-testid="menu-button"
            columns={["Id", "Name", "Title", "Message"]}
            keys={["id", "name", "data.title", "data.message"]}
            rows={targets.filter(
              (target) => target.notification_type == "EMAIL"
            )}
            handleOpenMenu={handleOpenMenu}
          />
        </Box>
      );
    } else if (selectedTab === 2) {
      return (
        <Box sx={{ "margin-bottom": "20px" }}>
          <DynamicTable
            data-testid="menu-button"
            columns={["Id", "Name", "auth"]}
            keys={["id", "name", "data.auth"]}
            rows={targets.filter(
              (target) => target.notification_type == "WEBHOOK"
            )}
            handleOpenMenu={handleOpenMenu}
          />
        </Box>
      );
    } else {
      return (
        <Box sx={{ "margin-bottom": "20px" }}>
          <DynamicTable
            data-testid="menu-button"
            columns={["Id", "Name", "Message"]}
            keys={["id", "name", "data.message"]}
            rows={targets.filter((target) => target.notification_type == "SMS")}
            handleOpenMenu={handleOpenMenu}
          />
        </Box>
      );
    }
  }

  return (
    <>
      <TargetCreateModal
        open={createModalopen}
        handleClose={() => setCreateModalOpen(false)}
      ></TargetCreateModal>
      <Container maxWidth="xl">
        <Grid container justifyContent="flex-end" className="targetButton">
          <Button data-testid="create-button" onClick={handleClickCreateButton}>
            New Target
          </Button>
        </Grid>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => {
              setSelectedTab(newValue);
            }}
            aria-label="basic tabs example"
          >
            <Tab
              icon={<Iconify icon={"la:slack"} />}
              label="Slack"
              iconPosition="start"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Iconify icon={"ic:outline-email"} />}
              iconPosition="start"
              label="Email"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Iconify icon={"material-symbols:webhook"} />}
              iconPosition="start"
              label="Webhook"
              {...a11yProps(2)}
            />
            <Tab
              icon={<Iconify icon={"material-symbols:sms-outline"} />}
              iconPosition="start"
              label="SMS"
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>
        {renderTable()}
      </Container>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          data-testid="delete-button"
          onClick={handleClickDelete}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
