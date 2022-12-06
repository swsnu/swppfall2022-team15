import {
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Iconify from "../Iconify/Iconify";
import Scrollbar from "../Scrollbar/Scrollbar";

export default function MessageTable(props: {
  columns: string[];
  keys: any;
  rows: any;
  handleOpenMenu: any;
}) {
  return (
    <Card>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {props.columns.map((col) => {
                  return <TableCell>{col}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.map((row: any) => {
                return (
                  <TableRow hover key={row.id} tabIndex={-1}>
                    {props.keys.map((key: string) => {
                      return (
                        <TableCell align="left">{row.data[key]}</TableCell>
                      );
                    })}
                    <TableCell align="right">
                      <IconButton
                        size="large"
                        color="inherit"
                        data-testid="open-menu-button"
                        onClick={props.handleOpenMenu}
                        data-id={row.id}
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
  );
}
