import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Label from "../../../components/label/Label";
import { AppDispatch } from "../../../store";
import {
  fetchProjects,
  projectListSelector,
} from "../../../store/slices/project";
import { useNavigate } from "react-router-dom";
import Scrollbar from "../../../components/scrollbar/Scrollbar";
import { Container } from "@mui/system";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import { ProjectType } from "../../../types";

export default function ListLayout(props: { projects: ProjectType[] }) {
  const navigate = useNavigate();

  const handleClickRow = (id: number) => {
    navigate(`/projects/${id}`);
  };

  const handleNewNotificationClick = () => {
    navigate("/multistep");
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);
  const projects = useSelector(projectListSelector);

  // if (props.projects.length === 0) {
  //   return <h4>No projects! Start by creating your first project!</h4>;
  // } else {
  //   return (
  //     <>
  //       <Container>
  //         <Card>
  //           <Scrollbar>
  //             <TableContainer sx={{ minWidth: 800 }}>
  //               <Table>
  //                 <TableBody>
  //                   {projects.map((row) => {
  //                     const { id, name, project_type } = row;
  //                     return (
  //                       <TableRow hover key={id} tabIndex={-1}>
  //                         {/* <TableCell
  //                         align="left"
  //                         onClick={() => handleClickRow(id)}
  //                       >
  //                         {id}
  //                       </TableCell> */}
  //                         <TableCell
  //                           align="left"
  //                           onClick={() => handleClickRow(id)}
  //                         >
  //                           {name}
  //                         </TableCell>
  //                         <TableCell align="left">
  //                           <Label
  //                             color={
  //                               (project_type === "ORGANIZATION" &&
  //                                 "primary") ||
  //                               "secondary"
  //                             }
  //                           >
  //                             {project_type}
  //                           </Label>
  //                         </TableCell>

  //                         <TableCell align="right">
  //                           <Button
  //                             variant="contained"
  //                             endIcon={<NotificationAddIcon />}
  //                             onClick={handleNewNotificationClick}
  //                           >
  //                             New Notification
  //                           </Button>
  //                         </TableCell>
  //                       </TableRow>
  //                     );
  //                   })}
  //                 </TableBody>
  //               </Table>
  //             </TableContainer>
  //           </Scrollbar>
  //         </Card>
  //       </Container>
  //     </>
  //   );
  // }

  return (
    <>
      <Container sx={{ mb: 3 }}>
        <Card>
          <Scrollbar>
            {/* 비율로 지정하면 좋을 것 같음 */}
            <TableContainer sx={{ height: 200 }}>
              <Table
                sx={{
                  height: "max-content",
                }}
              >
                <TableBody>
                  {projects.map((row) => {
                    const { id, name, project_type } = row;
                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        {/* <TableCell
                          align="left"
                          onClick={() => handleClickRow(id)}
                        >
                          {id}
                        </TableCell> */}
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
                            onClick={() => handleClickRow(id)}
                          >
                            {project_type}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <Button
                            variant="contained"
                            endIcon={<NotificationAddIcon />}
                            onClick={handleNewNotificationClick}
                          >
                            New Notification
                          </Button>
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
    </>
  );
}
