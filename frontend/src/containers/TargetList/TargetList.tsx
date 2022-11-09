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
import TargetCreateModal from "../../components/Targets/TargetCreateModal";
import { deleteTarget } from "../../services/target";
import { AppDispatch } from "../../store";
import { fetchTargets, targetListSelector } from "../../store/slices/target";

export default function TargetListTable() {
  const [open, setOpen]: [HTMLElement | null, any] = useState(null);
  const [createModalopen, setCreateModalOpen] = useState(false);

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
  }, []);
  const targets = useSelector(targetListSelector);

  return (
    <div>
      <TargetCreateModal
        open={createModalopen}
        handleClose={() => setCreateModalOpen(false)}
      ></TargetCreateModal>
      <Grid container justifyContent="flex-end">
        <Button onClick={handleClickCreateButton}>New Target</Button>
      </Grid>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Notification Type</TableCell>
              <TableCell>End Point</TableCell>
              {/*TODO - project name*/}
              <TableCell>Project Id</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {targets.map((row) => {
              const { id, name, notification_type, endpoint, project } = row;
              return (
                <TableRow hover key={id} tabIndex={-1}>
                  <TableCell align="left">{name}</TableCell>
                  <TableCell align="left">{notification_type}</TableCell>
                  <TableCell align="left">{endpoint}</TableCell>
                  <TableCell align="left">{project}</TableCell>
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
