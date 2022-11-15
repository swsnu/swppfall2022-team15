import {
  Button,
  Card,
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
import { useNavigate } from "react-router-dom";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import { Container } from "@mui/system";

export default function ProjectListTable() {
  const [open, setOpen]: [HTMLElement | null, any] = useState(null);
  const [createModalopen, setCreateModalOpen] = useState(false);

  const navigate = useNavigate();

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

  const handleClickRow = (id: number) => {
    navigate(`/projects/${id}`);
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);
  const projects = useSelector(projectListSelector);

  return (
    <>
      <ProjectCreateModal
        open={createModalopen}
        handleClose={() => setCreateModalOpen(false)}
      ></ProjectCreateModal>
      <Container>
        <Grid container justifyContent="flex-end">
          <Button data-testid="create-button" onClick={handleClickCreateButton}>
            New Project
          </Button>
        </Grid>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
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
                        <TableCell
                          align="left"
                          onClick={() => handleClickRow(id)}
                        >
                          {id}
                        </TableCell>
                        <TableCell
                          align="left"
                          onClick={() => handleClickRow(id)}
                        >
                          {name}
                        </TableCell>
                        <TableCell align="left">
                          <Label
                            color={
                              (project_type === "ORGANIZATION" && "primary") ||
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
                            data-testid="icon-button"
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
          </Scrollbar>
        </Card>
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
          onClick={handleClickDelete}
          data-testid="delete-button"
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
