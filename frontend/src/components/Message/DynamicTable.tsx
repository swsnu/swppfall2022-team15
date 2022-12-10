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
import {defaultInDepthFieldParser} from "./utils/dyanamicTableUtils";

export default function DynamicTable(props: {
  columns: string[];
  keys: any;
  rows: any;
  handleOpenMenu: any;
  onClickRow?: (id: number) => void;
  parser?: (field: string, item: any) => any;
}) {
  const { parser } = props;



  const inDepthFieldParser = (key: string, row: any) => {
    if (!parser) {
      return defaultInDepthFieldParser(key, row);
    }
    return parser(key, row);
  };

  const handleClickRow = (id: number) => {
    if (props.onClickRow) {
      props.onClickRow(id);
    }
  };

  return (
    <Card>
      <Scrollbar>
        <TableContainer
          sx={{
            maxHeight: "calc(100vh - 200px)",
          }}
        >
          <Table stickyHeader>
            <colgroup>
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
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
                      let value = inDepthFieldParser(key, row);
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
