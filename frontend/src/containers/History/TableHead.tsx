import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TableHead, TableCell, TableRow } from "@mui/material";

import { projectListSelector } from "../../store/slices/project";

import HistoryTableHeadCell from "./TableCell";
import { targetListSelector } from "../../store/slices/target";

interface tuple {
  object: string;
  checked: boolean;
}

export default function HistoryTableHead() {
  const projects = useSelector(projectListSelector);
  const targets = useSelector(targetListSelector);

  const [selectedProjects, setSelectedProjects] = useState<tuple[] | null>(
    null
  );

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
    if (selectedProjects !== null) {
      const newSelectedProjects = selectedProjects.map((project) => {
        if (project.object === event.currentTarget.textContent) {
          return {
            object: project.object,
            checked: !project.checked,
          };
        } else {
          return project;
        }
      });
      setSelectedProjects(newSelectedProjects);
    }
  };
  function initializeProject() {
    const projectList: tuple[] = [];
    projects.forEach((project) => {
      projectList.push({ object: project.name, checked: true });
    });
    setSelectedProjects(projectList);
  }

  const [anchorElType, setAnchorElType] = useState<null | HTMLElement>(null);
  const openType = Boolean(anchorElType);
  const typesInitial: tuple[] = [
    { object: "Slack", checked: true },
    { object: "Email", checked: true },
    { object: "HTTP", checked: true },
    { object: "SMS", checked: true },
  ];
  const [selectedTypes, setSelectedTypes] = useState<tuple[] | null>(
    typesInitial
  );
  const handleTypeOpen = (event: React.MouseEvent<HTMLTableCellElement>) => {
    setAnchorElType(event.currentTarget);
  };
  const handleTypeClose = () => {
    setAnchorElType(null);
  };
  const handleTypeClick = (event: React.MouseEvent<HTMLElement>) => {
    if (selectedTypes !== null) {
      const newSelectedTypes = selectedTypes.map((type) => {
        if (type.object === event.currentTarget.textContent) {
          return {
            object: type.object,
            checked: !type.checked,
          };
        } else {
          return type;
        }
      });
      setSelectedTypes(newSelectedTypes);
    }
  };

  const [anchorElStatus, setAnchorElStatus] = useState<null | HTMLElement>(
    null
  );
  const openStatus = Boolean(anchorElStatus);
  const statusInitial: tuple[] = [
    { object: "Success", checked: true },
    { object: "Failed", checked: true },
    { object: "Pending", checked: true },
  ];
  const [selectedStatus, setSelectedStatus] = useState<tuple[] | null>(
    statusInitial
  );
  const handleStatusOpen = (event: React.MouseEvent<HTMLTableCellElement>) => {
    setAnchorElStatus(event.currentTarget);
  };
  const handleStatusClose = () => {
    setAnchorElStatus(null);
  };
  const handleStatusClick = (event: React.MouseEvent<HTMLElement>) => {
    if (selectedStatus !== null) {
      const newSelectedStatus = selectedStatus.map((status) => {
        if (status.object === event.currentTarget.textContent) {
          return {
            object: status.object,
            checked: !status.checked,
          };
        } else {
          return status;
        }
      });
      setSelectedStatus(newSelectedStatus);
    }
  };

  const [anchorElTarget, setAnchorElTarget] = useState<null | HTMLElement>(
    null
  );
  const [selectedTargets, setSelectedTargets] = useState<tuple[] | null>(null);
  const openTarget = Boolean(anchorElTarget);
  const handleTargetOpen = (event: React.MouseEvent<HTMLTableCellElement>) => {
    setAnchorElTarget(event.currentTarget);
  };
  const handleTargetClose = () => {
    setAnchorElTarget(null);
  };
  const handleTargetClick = (event: React.MouseEvent<HTMLElement>) => {
    if (selectedTargets !== null) {
      const newSelectedTargets = selectedTargets.map((target) => {
        if (target.object === event.currentTarget.textContent) {
          return {
            object: target.object,
            checked: !target.checked,
          };
        } else {
          return target;
        }
      });
      setSelectedTargets(newSelectedTargets);
    }
  };
  function initializeTarget() {
    const targetList: tuple[] = [];
    targets.forEach((target) => {
      targetList.push({ object: target.name, checked: true });
    });
    setSelectedTargets(targetList);
  }

  useEffect(() => {
    initializeProject();
    initializeTarget();
  }, []);

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
          selectedObjects={selectedProjects}
          selectedRange={null}
        />
        <HistoryTableHeadCell
          title={"Type"}
          handleOpen={handleTypeOpen}
          handleClose={handleTypeClose}
          handleClick={handleTypeClick}
          open={openType}
          anchorEl={anchorElType}
          selectedObjects={selectedTypes}
          selectedRange={null}
        />
        <HistoryTableHeadCell
          title={"Target"}
          handleOpen={handleTargetOpen}
          handleClose={handleTargetClose}
          handleClick={handleTargetClick}
          open={openTarget}
          anchorEl={anchorElTarget}
          selectedObjects={selectedTargets}
          selectedRange={null}
        />
        <TableCell>Created</TableCell>
        <HistoryTableHeadCell
          title={"Status"}
          handleOpen={handleStatusOpen}
          handleClose={handleStatusClose}
          handleClick={handleStatusClick}
          open={openStatus}
          anchorEl={anchorElStatus}
          selectedObjects={selectedStatus}
          selectedRange={null}
        />
      </TableRow>
    </TableHead>
  );
}
