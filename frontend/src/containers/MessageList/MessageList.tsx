import { Box, Button, MenuItem, Popover, Tab, Tabs } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Iconify from "../../components/Iconify/Iconify";

import MessageCreateModal from "../../components/Message/MessageCreateModal";
import { deleteMessage } from "../../services/message";
import { fetchMessages, messageListSelector } from "../../store/slices/message";

import { AppDispatch } from "../../store";
import { Container } from "@mui/system";
import DynamicTable from "../../components/Message/DynamicTable";
import { EnumNotificationType } from "../../Enums";
import "./MessageList.css";
import {getMessageColumns, getMessageKeys} from "../../components/Message/utils/dyanamicTableUtils";

export default function MessageListTable() {
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
    const messageId = open!.dataset.id;
    await deleteMessage(Number(messageId));
    handleCloseMenu();
    dispatch(fetchMessages());
  };

  const handleClickCreateButton = (event: React.MouseEvent) => {
    setCreateModalOpen(true);
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);
  const messages = useSelector(messageListSelector);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "data-testid": `tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function renderTable() {
    switch (selectedTab) {
      // Slack
      case 0:
        return (
          <Box sx={{ "margin-bottom": "20px" }}>
            <DynamicTable
              columns={getMessageColumns("SLACK")}
              keys={getMessageKeys("SLACK")}
              rows={
                EnumNotificationType.SLACK in messages ? messages.SLACK : []
              }
              handleOpenMenu={handleOpenMenu}
            />
          </Box>
        );
      // Email
      case 1:
        return (
          <Box sx={{ "margin-bottom": "20px" }}>
            <DynamicTable
              columns={getMessageColumns("EMAIL")}
              keys={getMessageKeys("EMAIL")}
              rows={
                EnumNotificationType.EMAIL in messages ? messages.EMAIL : []
              }
              handleOpenMenu={handleOpenMenu}
            />
          </Box>
        );
      // Webhook
      case 2:
        return (
          <Box sx={{ "margin-bottom": "20px" }}>
            <DynamicTable
              columns={getMessageColumns("WEBHOOK")}
              keys={getMessageKeys("WEBHOOK")}
              rows={
                EnumNotificationType.WEBHOOK in messages ? messages.WEBHOOK : []
              }
              handleOpenMenu={handleOpenMenu}
            />
          </Box>
        );
      // SMS
      case 3:
        return (
          <Box sx={{ "margin-bottom": "20px" }}>
            <DynamicTable
              columns={getMessageColumns("SMS")}
              keys={getMessageKeys("SMS")}
              rows={EnumNotificationType.SMS in messages ? messages.SMS : []}
              handleOpenMenu={handleOpenMenu}
            />
          </Box>
        );
      default:
        setSelectedTab(0);
        return <></>;
    }
  }

  return (
    <>
      <MessageCreateModal
        open={createModalopen}
        handleClose={() => setCreateModalOpen(false)}
      ></MessageCreateModal>
      <Container maxWidth="xl">
        <Grid container justifyContent="flex-end" className="messageButton">
          <Button data-testid="create-button" onClick={handleClickCreateButton}>
            New Message
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
