import {
  TableCell,
  Container,
  Grid,
  Menu,
  Checkbox,
  MenuItem,
} from "@mui/material";

import Iconify from "../../components/Iconify/Iconify";

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
        <MenuItem onClick={props.handleClick} data-testid={`click ${props.title} ${selected.object}`} disableRipple>
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
      <TableCell onClick={props.handleOpen} data-testid={`click ${props.title}`}>
        <Container>
          <Grid container>
            <Grid item xs={10} sm={10} md={8} lg={3}>
              {props.title}
            </Grid>
            <Grid item xs={2} sm={2} md={4} lg={9}>
              <Iconify icon="material-symbols:filter-list" />
            </Grid>
          </Grid>
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
