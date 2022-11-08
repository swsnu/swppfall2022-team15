import {
  Button,
  IconButton,
  MenuItem,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Iconify from "../../components/iconify/Iconify";

import MessageCreateModal from "../../components/Message/MessageCreateModal";
import { deleteMessage } from "../../services/message";
import { fetchMessages, messageListSelector } from "../../store/slices/message";

import { AppDispatch } from "../../store";

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
    <div>
      <MessageCreateModal
        open={createModalopen}
        handleClose={() => setCreateModalOpen(false)}
      ></MessageCreateModal>
      <Grid container justifyContent="flex-end">
        <Button onClick={handleClickCreateButton}>New Message</Button>
      </Grid>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {messages.map((row) => {
              const { id, title, content } = row;
              return (
                <TableRow hover key={id} tabIndex={-1}>
                  <TableCell align="left">{title}</TableCell>
                  <TableCell align="left">{content}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="large"
                      color="inherit"
                      onClick={handleOpenMenu}
                      data-id={id}
                    >
                      <Iconify icon={"eva:more-vertical-fill"} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
        <MenuItem sx={{ color: "error.main" }} onClick={handleClickDelete}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </div>
  );
}
