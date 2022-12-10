import { Table, TableBody, TableCell, TableRow, Card } from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";

import Scrollbar from "../../components/Scrollbar/Scrollbar";
import HistoryTableHead from "./TableHead";
import { fetchAllNotifications, notificationListSelector } from "../../store/slices/notifications";
import { useEffect } from "react";
import { AppDispatch } from "../../store";

/*
const fakeData = [
  {
    project: "project1",
    type: "SLACK",
    endpoint: "endpoint1",
    date: "2022-12-10",
    status: "SUCCESS",
  },
  {
    project: "project2",
    type: "SLACK",
    endpoint: "endpoint1",
    date: "2022-12-10",
    status: "SUCCESS",
  },
  {
    project: "project3",
    type: "SLACK",
    endpoint: "endpoint1",
    date: "2022-12-10",
    status: "FAILURE",
  },
  {
    project: "project4",
    type: "SLACK",
    endpoint: "endpoint1",
    date: "2022-12-10",
    status: "PENDING",
  },
  {
    project: "project1",
    type: "SMS",
    endpoint: "010-1234-1234",
    date: "2022-12-10",
    status: "SUCCESS",
  },
  {
    project: "project1",
    type: "SMS",
    endpoint: "010-1234-1234",
    date: "2022-12-10",
    status: "FAILURE",
  },
  {
    project: "project1",
    type: "SMS",
    endpoint: "010-0000-0000",
    date: "2022-12-10",
    status: "PENDING",
  },
  {
    project: "project2",
    type: "SMS",
    endpoint: "010-0000-0000",
    date: "2022-12-10",
    status: "PENDING",
  },
  {
    project: "project2",
    type: "EMAIL",
    endpoint: "email@email.com",
    date: "2022-12-10",
    status: "SUCCESS",
  },
  {
    project: "project2",
    type: "EMAIL",
    endpoint: "test@test.com",
    date: "2022-12-10",
    status: "SUCCESS",
  },
  {
    project: "project2",
    type: "EMAIL",
    endpoint: "user@user.com",
    date: "2022-12-10",
    status: "SUCCESS",
  },
  {
    project: "project3",
    type: "EMAIL",
    endpoint: "email@email.com",
    date: "2022-12-10",
    status: "FAILURE",
  },
  {
    project: "project3",
    type: "WEBHOOK",
    endpoint: "noti-manager.site",
    date: "2022-12-10",
    status: "PENDING",
  },
];
*/

export default function HistoryTable() {
  const notifications = useSelector(notificationListSelector);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllNotifications());
  })
  //const notifications = fakeData;

  return (
    <>
      <Container>
        <Card>
          <Scrollbar>
            <Table>
              <HistoryTableHead />
              <TableBody>
                {notifications.map((notification, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Container>{"Project (Need Fix)"}</Container>
                    </TableCell>
                    <TableCell>
                      <Container>{notification.type}</Container>
                    </TableCell>
                    <TableCell>
                      <Container>{"Endpoint (Need Fix)"}</Container>
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
