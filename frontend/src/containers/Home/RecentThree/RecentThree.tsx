import "./RecentThree.css";
import { NotificationType } from "../../../types";
import { EnumNotificationStatus } from "../../../Enums";

const success_style = {
  color: "#00B74A",
  backgroundColor: "#E3FCEC",
  borderColor: "#00B74A",
};

const failure_style = {
  color: "#FF0000",
  backgroundColor: "#FEE2E2",
  borderColor: "#FF0000",
};

function RecentThree(props: { notifications: NotificationType[] }) {
  const lastIndex = props.notifications.length - 1;

  if (props.notifications.length === 0) {
    return (
      <div>
        <p>No notifications</p>
      </div>
    );
  } else {
    return (
      <table className="table_recent">
        <thead>
          <tr>
            <th className="titleText">Recent 3 notifications</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style={
              props.notifications[lastIndex].status ===
              EnumNotificationStatus.SUCCESS
                ? success_style
                : failure_style
            }
            className="message"
          >
            <td>{props.notifications[lastIndex].message}</td>
          </tr>

          <tr
            style={
              props.notifications[lastIndex - 1].status ===
              EnumNotificationStatus.SUCCESS
                ? success_style
                : failure_style
            }
            className="message"
          >
            <td>{props.notifications[lastIndex - 1].message}</td>
          </tr>

          <tr
            style={
              props.notifications[lastIndex - 2].status ===
              EnumNotificationStatus.SUCCESS
                ? success_style
                : failure_style
            }
            className="message_last"
          >
            <td>{props.notifications[lastIndex - 2].message}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default RecentThree;
