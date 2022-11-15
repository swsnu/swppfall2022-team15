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
  const length = props.notifications.length;

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
          {props.notifications.slice(length-3, length).map((notification) => {
            return (
            <tr
              style={
                notification.status ===
                EnumNotificationStatus.SUCCESS
                  ? success_style
                  : failure_style
              }
              className="message"
          >
            <td>{notification.message}</td>
          </tr>
            )}
          )}
        </tbody>
      </table>
    );
  }
}

export default RecentThree;
