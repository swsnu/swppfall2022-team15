import { EnumNotificationStatus } from "./enums";

export type NotificationType = {
  id: number;
  status: EnumNotificationStatus;
  message: string; // FIXME(Given) : rename to data?
  reservedAt: string;
  history?: NotificationHistoryType[];
};

export type NotificationHistoryType = {
  id: number;
  endpoint: string;
  date: string;
  status: EnumNotificationStatus;
};
