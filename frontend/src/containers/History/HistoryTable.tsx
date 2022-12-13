import { Table, TableBody, TableCell, TableRow, Card } from "@mui/material";
import { Grid, TableContainer, TablePagination } from "@material-ui/core";
import { Container } from "@mui/system";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import Scrollbar from "../../components/Scrollbar/Scrollbar";
import HistoryTableHead from "./TableHead";
import Label from "../../components/Label/Label";

import { AppDispatch } from "../../store";
import "./HistoryTable.css"

interface HistoryType {
  id: number,
  project: string,
  target: string,
  status: string,
  created_at: string,
}

interface HistoryData {
  count: number,
  next: string,
  previous: string,
  results: HistoryType[]
}

export default function HistoryTable() {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
    
  };

  const getColor = (status: string) => {
    if (status === "SUCCESS") {
      return "success";
    } else if (status === "PENDING") {
      return "warning";
    } else {
      return "error";
    }
  };



  return (
    <>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" className="HistoryTitle">
          <Grid item>
            <h2>History</h2>
          </Grid>
        </Grid>
        <Card>
          <Scrollbar>
            <TableContainer
              style={{
                maxHeight: "calc(100vh - 200px)",
              }}>
                <Table>
              <HistoryTableHead />
              <TableBody>
                {}
              </TableBody>
            </Table>
            </TableContainer>
            
            <TablePagination
              rowsPerPageOptions={[25]}
              component="div"
              count={100}
              rowsPerPage={25}
              page={page}
              onPageChange={handlePageChange}
            />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
