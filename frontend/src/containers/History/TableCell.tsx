import { TableCell, Container, Menu, Checkbox, MenuItem } from "@mui/material";

import { InlineIcon } from "@iconify/react";

interface range {
  start: string;
  end: string;
}

interface Hash {
  [key: string]: boolean;
}

interface IProps {
  title: string;
  handleOpen: (event: React.MouseEvent<HTMLTableCellElement>) => void;
  handleClose: () => void;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
  anchorEl: null | HTMLElement;
  objects: Hash;
  selectedRange: range | null;
}

export default function HistoryTableHeadCell(props: IProps) {
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
        {Object.keys(props.objects).map((key, value) => {
          return (
            <MenuItem
              onClick={props.handleClick}
              data-testid={`click ${key}`}
              disableRipple
            >
              <Checkbox
                checked={props.objects[key]}
                data-testid={`checkbox ${key}`}
              />
              <span>{key}</span>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
