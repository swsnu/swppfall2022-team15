import "./RecentThree.css";
import { NotificationType } from "../../../types";
import { EnumNotificationStatus } from "../../../Enums";


function RecentThree(props: { notifications: NotificationType[] }) {
    const lastIndex = props.notifications.length - 1;

    if (props.notifications.length === 0) {
        return (
            <div>
                <p>No notifications</p>
            </div>
        )
    }
    else {
        return (
            <div>
                <body>
                    <table className="table_recent">
                        <thead>
                            <tr>
                                <th className="titleText">Recent 3 notifications</th>
                            </tr>
                        </thead>
                        <tbody>
                            <div className={props.notifications[lastIndex].status === EnumNotificationStatus.SUCCESS ? "success" : "failed"}>
                                <tr>
                                    <td>{props.notifications[lastIndex].message}</td>
                                </tr>
                            </div>
                            <div className={props.notifications[lastIndex-1].status === EnumNotificationStatus.SUCCESS ? "success" : "failed"}>
                                <tr>
                                    <td>{props.notifications[lastIndex - 1].message}</td>
                                </tr>
                            </div>
                            <div className={props.notifications[lastIndex-2].status === EnumNotificationStatus.SUCCESS ? "success_last" : "failed_last"}>
                                <tr>
                                    <td>{props.notifications[lastIndex - 2].message}</td>
                                </tr>
                            </div>

                            

                        </tbody>

                    </table>
                </body>
            </div>
        )
    }
}


export default RecentThree;