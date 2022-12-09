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

export default function DynamicTable(props: {
  columns: string[];
  keys: any;
  rows: any;
  handleOpenMenu: any;
  onClickRow?: (e: any) => void;
}) {
  const handleClickRow = (id: number) => {
    if (props.onClickRow) {
      props.onClickRow(id);
    }
  };

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
                  <TableRow
                    hover
                    key={row.id}
                    tabIndex={-1}
                    onClick={() => handleClickRow(row.id)}
                  >
                    {props.keys.map((key: string) => {
                      const fields = key.split(".");
                      let value = row;

                      fields.forEach((field) => {
                        value = value[field];
                      });
                      return <TableCell align="left">{value}</TableCell>;
                    })}
                    {props.handleOpenMenu && (
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
                    )}
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
