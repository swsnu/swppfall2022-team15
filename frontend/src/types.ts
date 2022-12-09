import { EnumNotificationStatus } from "./Enums";
import { RecurrenceType } from "./components/Recurrence";

export type ProjectType = {
  id: number;
  project_type: string;
  name: string;
};

export type NotificationConfigType = {
    id: number;
    project: number;
    message: number
    type: string;
    rrule: string;
    mode: string;
}

export type NotificationType = {
  id: number;
  status: EnumNotificationStatus;
  message: string; // FIXME(Given) : rename to data?
  reservedAt: string;
  type: string;
  history?: NotificationHistoryType[];
};

export type NotificationConfigCreateDto = {
      project: number,
      type: string
      rrule?: string,
      message: number,
      target_users: number[],
      mode: string
    };

export type ReservationType = {
  id: number;
  reservation: string;
};

export type NotificationHistoryType = {
  id: number;
  endpoint: string;
  date: string;
  status: EnumNotificationStatus;
};

export interface TargetType {
  id: number;
  name: string;
  notification_type: string;
  endpoint: string;
  data: object;
}

export interface TargetUserIdNameDto {
  value: number;
  label: string;
}

export interface TargetListType {
  [key: string]: TargetType[];
}

export interface MessageType {
  id: number;
  name: string;
  notification_type: string;
  data: any;
}

export interface SlackData {
  channel: string;
  message: string;
}

export interface EmailData {
  title: string;
  content: string;
}

export interface WebhookData {
  message: string;
}

export interface SmsData {
  message: string;
}

export interface MessageListType {
  [key: string]: MessageType[];
}

export interface RecurrentReservationType {
  recurrence: RecurrenceType;
  target: TargetType[];
}

export interface AuthUser {
  email: string;
  username: string;
}
