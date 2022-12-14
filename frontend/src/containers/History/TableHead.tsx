import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableHead, TableCell, TableRow, Container } from "@mui/material";

import HistoryTableHeadCell from "./TableCell";
import { projectListSelector } from "../../store/slices/project";
import {
  addStatusFilter,
  addTypeFilter,
  removeStatusFilter,
  removeTypeFilter,
  selectFilter,
} from "../../store/slices/historyFilter";
import { targetListSelector } from "../../store/slices/target";
import { AppDispatch } from "../../store";

export default function HistoryTableHead() {
  //const projects = useSelector(projectListSelector);
  //const targets = useSelector(targetListSelector);
  const dispatch = useDispatch<AppDispatch>();
  const filterState = useSelector(selectFilter);

  const [anchorElType, setAnchorElType] = useState<null | HTMLElement>(null);
  const openType = Boolean(anchorElType);
  const handleTypeOpen = (event: React.MouseEvent<HTMLTableCellElement>) => {
    setAnchorElType(event.currentTarget);
  };
  const handleTypeClose = () => {
    setAnchorElType(null);
  };
  const handleTypeClick = (event: React.MouseEvent<HTMLElement>) => {
    const clickedType = event.currentTarget.textContent;
    if (clickedType === null) {
      return;
    }

    if (filterState.typeFilters[clickedType]) {
      dispatch(removeTypeFilter(clickedType));
    } else {
      dispatch(addTypeFilter(clickedType));
    }
  };

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
    const clickedStatus = event.currentTarget.textContent;
    if (clickedStatus === null) {
      return;
    }

    if (filterState.statusFilters[clickedStatus]) {
      dispatch(removeStatusFilter(clickedStatus));
    } else {
      dispatch(addStatusFilter(clickedStatus));
    }
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Container>Project</Container>
        </TableCell>
        <HistoryTableHeadCell
          title={"Type"}
          handleOpen={handleTypeOpen}
          handleClose={handleTypeClose}
          handleClick={handleTypeClick}
          open={openType}
          anchorEl={anchorElType}
          objects={filterState.typeFilters}
          selectedRange={null}
        />
        <TableCell>
          <Container>Target</Container>
        </TableCell>
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
          objects={filterState.statusFilters}
          selectedRange={null}
        />
      </TableRow>
    </TableHead>
  );
}
