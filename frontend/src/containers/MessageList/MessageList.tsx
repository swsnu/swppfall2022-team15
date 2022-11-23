import { Button, MenuItem, Popover } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Iconify from "../../components/iconify/Iconify";

import MessageCreateModal from "../../components/Message/MessageCreateModal";
import { deleteMessage } from "../../services/message";
import { fetchMessages, messageListSelector } from "../../store/slices/message";

import { AppDispatch } from "../../store";
import { Container } from "@mui/system";
import MessageTable from "../../components/Message/MessageTable";
import { EnumNotificationType } from "../../Enums";

export default function MessageListTable() {
  const [open, setOpen]: [HTMLElement | null, any] = useState(null);
  const [createModalopen, setCreateModalOpen] = useState(false);

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
  }, []);
  const messages = useSelector(messageListSelector);

  return (
    <>
      <MessageCreateModal
        open={createModalopen}
        handleClose={() => setCreateModalOpen(false)}
      ></MessageCreateModal>
      <Container>
        <Grid container justifyContent="flex-end">
          <Button data-testid="create-button" onClick={handleClickCreateButton}>
            New Message
          </Button>
        </Grid>
        <h1>Slack</h1>
        <MessageTable
          columns={["channel", "message"]}
          keys={["channel", "message"]}
          rows={EnumNotificationType.SLACK in messages ? messages.SLACK : []}
          handleOpenMenu={handleOpenMenu}
        />
        <br />
        <hr />
        <h1>HTTP</h1>
        <MessageTable
          columns={["channel", "message"]}
          keys={["channel", "message"]}
          rows={EnumNotificationType.EMAIL in messages ? messages.EMAIL : []}
          handleOpenMenu={handleOpenMenu}
        />
        <br />
        <hr />
        <h1>SMS</h1>
        <MessageTable
          columns={["channel", "message"]}
          keys={["channel", "message"]}
          rows={EnumNotificationType.SMS in messages ? messages.SMS : []}
          handleOpenMenu={handleOpenMenu}
        />
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
