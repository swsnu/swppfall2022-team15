import { TableCell, Container, Menu, Checkbox, MenuItem } from "@mui/material";

import { InlineIcon } from "@iconify/react";

interface tuple {
  object: string;
  checked: boolean;
}

interface range {
  start: string;
  end: string;
}

interface IProps {
  title: string;
  handleOpen: (event: React.MouseEvent<HTMLTableCellElement>) => void;
  handleClose: () => void;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
  anchorEl: null | HTMLElement;
  selectedObjects: tuple[] | null;
  selectedRange: range | null;
}

export default function HistoryTableHeadCell(props: IProps) {
  function render() {
    if (props.selectedObjects !== null) {
      return props.selectedObjects?.map((selected) => (
        <MenuItem
          onClick={props.handleClick}
          data-testid={`click ${props.title} ${selected.object}`}
          disableRipple
        >
          <Checkbox checked={selected.checked} />
          <span>{selected.object}</span>
        </MenuItem>
      ));
    } else {
      return <></>;
    }
  }

  return (
    <>
      <TableCell
        onClick={props.handleOpen}
        data-testid={`click ${props.title}`}
      >
        <Container>
          {props.title} <InlineIcon icon="material-symbols:filter-list" />
        </Container>
      </TableCell>
      <Menu
        open={props.open}
        anchorEl={props.anchorEl}
        onClose={props.handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {render()}
      </Menu>
    </>
  );
}
