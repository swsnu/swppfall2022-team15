import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";

import Label from "../../../components/label/Label";
import {
  projectListSelector,
} from "../../../store/slices/project";

export default function ListLayout() {
  const projects = useSelector(projectListSelector);
  const navigate = useNavigate();

  const handleClickRow = (id: number) => {
    navigate(`/projects/${id}`);
  };

  const handleNewNotificationClick = () => {
    navigate("/multistep");
  };

  if (projects.length === 0) {
    return <div>No projects! Start by creating your first project!</div>;
  }
  else {
    return (
      <TableContainer>
        <Table>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell align="left" onClick={() => handleClickRow(project.id)}>
                  {project.name}
                </TableCell>
                <TableCell align="left">
                  <Label
                    color={project.project_type === "ORGANIZATION" ? "primary" : "secondary"}
                    onClick={() => handleClickRow(project.id)}
                  >
                    {project.project_type}
                  </Label>
                </TableCell>
                <TableCell align="right">
                  <Button
                    endIcon={<NotificationAddIcon />}
                    onClick={handleNewNotificationClick}
                  >
                    New Notification
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
