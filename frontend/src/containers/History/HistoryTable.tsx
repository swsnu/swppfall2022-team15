import { Table, TableBody, TableCell, TableRow, Card } from "@mui/material";
import { Grid, TableContainer, TablePagination } from "@material-ui/core";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Scrollbar from "../../components/Scrollbar/Scrollbar";
import HistoryTableHead from "./TableHead";
import Label from "../../components/Label/Label";

import { AppDispatch } from "../../store";
import "./HistoryTable.css"
import axios from "axios";
import { notificationSelect } from "../../store/slices/notifications";

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
  const [results, setResults] = useState<HistoryType[]>([]);
  const [next, setNext] = useState<string>("");
  const [previous, setPrevious] = useState<string>("");

  const notifications = useSelector(notificationSelect);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get("/api/notification/", {
          params: {
            page: page+1,
            page_size: 25,
            status: "SUCCESS",
          }
        }).then(response => {
          const data = response.data;
          setResults(data.results);
          setNext(data.next);
          setPrevious(data.previous);
        })
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  const handlePageChange = (event: unknown, newPage: number) => {
    const getNext = async () => {
      try {
        await axios.get(next).then(response => {
          const data = response.data;
          setResults(data.results);
          setNext(data.next);
          setPrevious(data.previous);
        })
      } catch (error) {
        console.log(error);
      }
    }

    const getPrevious = async () => {
      try {
        await axios.get(previous).then(response => {
        const data = response.data;
        setResults(data.results);
        setNext(data.next);
        setPrevious(data.previous);
      })
      } catch (error) {
        console.log(error);
      }
    }

    if(newPage > page) {
      getNext();
    } else {
      getPrevious();
    }
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

  const formatDateTime = (dateTime: string) => {
    const date = dateTime.split("T")[0];
    const time = dateTime.split("T")[1].split(".")[0];

    return `${date} ${time}`;
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
                {results.map((row) => (
                  <TableRow
                    hover
                    key={row.id}
                  >
                    <TableCell><Container>{row.project}</Container></TableCell>
                    <TableCell><Container>{"TODO: TYPE"}</Container></TableCell>
                    <TableCell><Container>{row.target}</Container></TableCell>
                    <TableCell><Container>{formatDateTime(row.created_at)}</Container></TableCell>
                    <TableCell><Container>
                      <Label color={getColor(row.status)}>{row.status}</Label></Container>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
            
            <TablePagination
              rowsPerPageOptions={[25]}
              component="div"
              count={notifications.totalNumber}
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
