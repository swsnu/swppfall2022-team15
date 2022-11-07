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
import Label from "../../components/label/Label";
import ProjectCreateModal from "../../components/project/ProjectCreateModal";
import { deleteProject } from "../../services/project";
import { AppDispatch } from "../../store";
import { fetchProjects, projectListSelector } from "../../store/slices/project";

export default function ProjectListTable() {
  const [open, setOpen]: [HTMLElement | null, any] = useState(null);
  const [createModalopen, setCreateModalOpen] = useState(false);

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClickDelete = async () => {
    const projectId = open!.dataset.id;
    await deleteProject(Number(projectId));
    handleCloseMenu();
    dispatch(fetchProjects());
  };

  const handleClickCreateButton = (event: React.MouseEvent) => {
    setCreateModalOpen(true);
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);
  const projects = useSelector(projectListSelector);

  return (
    <div>
      <ProjectCreateModal
        open={createModalopen}
        handleClose={() => setCreateModalOpen(false)}
      ></ProjectCreateModal>
      <Grid container justifyContent="flex-end">
        <Button onClick={handleClickCreateButton}>New Project</Button>
      </Grid>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Most Recently Sent Notification</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((row) => {
              const { id, name, project_type } = row;
              return (
                <TableRow hover key={id} tabIndex={-1}>
                  <TableCell align="left">{name}</TableCell>

                  <TableCell align="left">
                    <Label
                      color={
                        (project_type === "organization" && "primary") ||
                        "secondary"
                      }
                    >
                      {project_type}
                    </Label>
                  </TableCell>

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
