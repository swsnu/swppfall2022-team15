import axios from "axios";
import { NotificationConfigCreateDto } from "../types";

export async function createNotificationConfig(
  notificationConfig: NotificationConfigCreateDto
) {
  const response = await axios.post(
    "/api/notification_config/",
    notificationConfig
  );
  return response.data.id;
}
