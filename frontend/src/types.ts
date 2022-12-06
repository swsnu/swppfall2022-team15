import { EnumNotificationStatus } from "./Enums";
import {RecurrenceType} from "./components/Recurrence";

export type ProjectType = {
  id: number;
  project_type: string;
  name: string;
};

export type NotificationType = {
  id: number;
  status: EnumNotificationStatus;
  message: string; // FIXME(Given) : rename to data?
  reservedAt: string;
  type: string;
  history?: NotificationHistoryType[];
};

export type ReservationType = {
  id: number;
  reservation: string
}

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
  project: number;
}

// TODO: Message Type 내 attribute를 정하는 과정이 필요해 보입니다
// (https://github.com/swsnu/swppfall2022-team15/issues/48)
export interface MessageType {
  id: number;
  name: string;
  data: any;
}

export interface SlackContent {
    channel: string;
    message: string;
}

export interface EmailContent {
    title: string;
    content: string;
}

export type Content = SlackContent | EmailContent;

export interface MessageListType {
  [key: string]: MessageType[]
}

export interface RecurrentReservationType {
  recurrence: RecurrenceType
  target: TargetType[]
}

export interface AuthUser {
  email: string;
  username: string;
}
