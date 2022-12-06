import { Table, TableBody, TableCell, TableRow, Card } from "@mui/material";
import { Container } from "@mui/system";
import { useSelector } from "react-redux";

import Scrollbar from "../../components/Scrollbar/Scrollbar";
import HistoryTableHead from "./TableHead";
import { notificationListSelector } from "../../store/slices/notifications";

export default function HistoryTable() {
  const notifications = useSelector(notificationListSelector);
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
                    <TableCell>{"project"}</TableCell>
                    <TableCell>{notification.type}</TableCell>
                    <TableCell>
                      {"ENDPOINT"}
                    </TableCell>
                    <TableCell>{"DATE"}</TableCell>
                    <TableCell>{"STATUS"}</TableCell>
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
