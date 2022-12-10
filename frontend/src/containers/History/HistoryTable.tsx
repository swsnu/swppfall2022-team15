import { Table, TableBody, TableCell, TableRow, Card } from "@mui/material";
import { Grid } from "@material-ui/core";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";

import Scrollbar from "../../components/Scrollbar/Scrollbar";
import HistoryTableHead from "./TableHead";
import {
  fetchAllNotifications,
  notificationListSelector,
} from "../../store/slices/notifications";
import { useEffect } from "react";
import { AppDispatch } from "../../store";

import "./HistoryTable.css"

export default function HistoryTable() {
  const notificationConfigs = useSelector(notificationListSelector);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllNotifications());
  }, [])

  return (
    <>
      <Container>
        <Grid container justifyContent="space-between" className="HistoryTitle">
          <Grid item>
            <h2>History</h2>
          </Grid>
        </Grid>
        <Card>
          <Scrollbar>
            <Table>
              <HistoryTableHead />
              <TableBody>
                {notificationConfigs.map((notification, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Container>{"NEED API TO GET PROJECT"}</Container>
                    </TableCell>
                    <TableCell>
                      <Container>{notification.type}</Container>
                    </TableCell>
                    <TableCell>
                      <Container>{"NEED API TO GET TARGET"}</Container>
                    </TableCell>
                    <TableCell>
                      <Container>{notification.reservedAt}</Container>
                    </TableCell>
                    <TableCell>
                      <Container>{notification.status}</Container>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
