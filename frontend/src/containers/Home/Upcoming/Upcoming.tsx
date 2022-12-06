import "./Upcoming.css";
import { NotificationType } from "../../../types";

function Upcoming(props: { upcomingNotifications: NotificationType[] }) {
  const lastIndex = props.upcomingNotifications.length - 1;

  function table(i: number) {
    if (props.upcomingNotifications[i] !== undefined) {
      return (
        <tr className="tr">
          <td className="messageText_upcoming">
            {props.upcomingNotifications[lastIndex - i].message}
          </td>
        </tr>
      );
    } else {
      if (i === 0) {
        return (
          <tr className="tr">
            <td className="messageText_upcoming">No upcoming notifications</td>
          </tr>
        );
      } else {
        return (
          <tr className="tr">
            <td className="messageText_upcoming"></td>
          </tr>
        );
      }
    }
  }

  return (
    
      <table className="table_upcoming">
        <thead>
          <tr>
            <th className="titleText_upcoming">Upcoming notifications</th>
          </tr>
        </thead>
        <tbody>
          {table(0)}
          {table(1)}
          {table(2)}
          {table(3)}
          {table(4)}
          {table(5)}
          {table(6)}
          {table(7)}
          {table(8)}
          {table(9)}
        </tbody>
      </table>

  );
}

export default Upcoming;