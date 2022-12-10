import { Table, TableBody, TableCell, TableRow, Card } from "@mui/material";
import { Grid } from "@material-ui/core";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";

import Scrollbar from "../../components/Scrollbar/Scrollbar";
import HistoryTableHead from "./TableHead";
import { fetchAllNotificationConfigs, notificationConfigList } from "../../store/slices/notificationConfig"
import { useEffect } from "react";
import { AppDispatch } from "../../store";

import "./HistoryTable.css"

export default function HistoryTable() {
  const notificationConfigs = useSelector(notificationConfigList);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllNotificationConfigs());
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
                      <Container>{notification.project}</Container>
                    </TableCell>
                    <TableCell>
                      <Container>{notification.type}</Container>
                    </TableCell>
                    <TableCell>
                      <Container>{"ENDPOINT: NEED FIX"}</Container>
                    </TableCell>
                    <TableCell>
                      <Container>{"CREATED AT: NEED FIX"}</Container>
                    </TableCell>
                    <TableCell>
                      <Container>{"STATUS: NEED FIX"}</Container>
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
