import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TableHead, TableCell, TableRow, Container } from "@mui/material";

import HistoryTableHeadCell from "./TableCell";
import { changeProject, changeStatus, changeTarget, changeType } from "../../store/slices/historyCategory";
import { projectListSelector } from "../../store/slices/project";
import { targetListSelector } from "../../store/slices/target";

export default function HistoryTableHead() {
  const projects = useSelector(projectListSelector);
  const targets = useSelector(targetListSelector);

  const [projectList, setProjectList] = useState(["All"]);
  const [targetList, setTargetList] = useState(["All"]);

  useEffect(() => {
    function initializeProject() {
      const projectList = ["All"];
      projects.forEach((project) => {
        projectList.push(project.name);
      });
      setProjectList(projectList);
    }
    function initializeTarget() {
      const targetList = ["All"];
      targets.forEach((target) => {
        targetList.push(target.name);
      });
      setTargetList(targetList);
    }
    initializeProject();
    initializeTarget();
  }, [projects, targets]);


  const [selectedProject, setSelectedProject] = useState("All");
  const [anchorElProject, setAnchorElProject] = useState<null | HTMLElement>(
    null
  );
  const openProject = Boolean(anchorElProject);
  const handleProjectOpen = (event: React.MouseEvent<HTMLTableCellElement>) => {
    setAnchorElProject(event.currentTarget);
  };
  const handleProjectClose = () => {
    setAnchorElProject(null);
  };
  const handleProjectClick = (event: React.MouseEvent<HTMLElement>) => {
    const clickedProject = event.currentTarget.textContent as string;
    setSelectedProject(clickedProject);
    changeProject(selectedProject);
  };

  const [selectedType, setSelectedType] = useState("All");
  const [anchorElType, setAnchorElType] = useState<null | HTMLElement>(null);
  const openType = Boolean(anchorElType);
  const handleTypeOpen = (event: React.MouseEvent<HTMLTableCellElement>) => {
    setAnchorElType(event.currentTarget);
  };
  const handleTypeClose = () => {
    setAnchorElType(null);
  };
  const handleTypeClick = (event: React.MouseEvent<HTMLElement>) => {
    const clickedType = event.currentTarget.textContent as string;
    setSelectedType(clickedType);
    changeType(selectedType);
  };
  
  const [selectedTarget, setSelectedTarget] = useState("All");
  const [anchorElTarget, setAnchorElTarget] = useState<null | HTMLElement>(
    null
  );
  const openTarget = Boolean(anchorElTarget);
  const handleTargetOpen = (event: React.MouseEvent<HTMLTableCellElement>) => {
    setAnchorElTarget(event.currentTarget);
  };
  const handleTargetClose = () => {
    setAnchorElTarget(null);
  };
  const handleTargetClick = (event: React.MouseEvent<HTMLElement>) => {
    const clickedTarget = event.currentTarget.textContent as string;
    setSelectedTarget(clickedTarget);
    changeTarget(selectedTarget);
  };

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [anchorElStatus, setAnchorElStatus] = useState<null | HTMLElement>(
    null
  );
  const openStatus = Boolean(anchorElStatus);
  const handleStatusOpen = (event: React.MouseEvent<HTMLTableCellElement>) => {
    setAnchorElStatus(event.currentTarget);
  };
  const handleStatusClose = () => {
    setAnchorElStatus(null);
  };
  const handleStatusClick = (event: React.MouseEvent<HTMLElement>) => {
    const clickedStatus = event.currentTarget.textContent as string;
    setSelectedStatus(clickedStatus);
    changeStatus(selectedStatus);
  };

  return (
    <TableHead>
      <TableRow>
        <HistoryTableHeadCell
          title={"Project"}
          handleOpen={handleProjectOpen}
          handleClose={handleProjectClose}
          handleClick={handleProjectClick}
          open={openProject}
          anchorEl={anchorElProject}
          objects={projectList}
          selectedObject={selectedProject}  
        />
        <HistoryTableHeadCell
          title={"Type"}
          handleOpen={handleTypeOpen}
          handleClose={handleTypeClose}
          handleClick={handleTypeClick}
          open={openType}
          anchorEl={anchorElType}
          objects={["All", "Slack", "Email", "SMS", "Webhook"]}
          selectedObject={selectedType}
        />
        <HistoryTableHeadCell
          title={"Target"}
          handleOpen={handleTargetOpen}
          handleClose={handleTargetClose}
          handleClick={handleTargetClick}
          open={openTarget}
          anchorEl={anchorElTarget}
          objects={targetList}
          selectedObject={selectedTarget}
        />
        <TableCell>
          <Container>Created</Container>
        </TableCell>
        <HistoryTableHeadCell
          title={"Status"}
          handleOpen={handleStatusOpen}
          handleClose={handleStatusClose}
          handleClick={handleStatusClick}
          open={openStatus}
          anchorEl={anchorElStatus}
          objects={["All", "Success", "Failure", "Pending"]}
          selectedObject={selectedStatus}
        />
      </TableRow>
    </TableHead>
  );
}
