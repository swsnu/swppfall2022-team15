import { EnumNotificationStatus } from "./Enums";

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
  history?: NotificationHistoryType[];
};

export type NotificationHistoryType = {
  id: number;
  endpoint: string;
  date: string;
  status: EnumNotificationStatus;
};

export interface TargetType {
  id: number;
  target_name: string;
  message_type: string;
  end_point: string;
}

// TODO: Message Type 내 attribute를 정하는 과정이 필요해 보입니다
// (https://github.com/swsnu/swppfall2022-team15/issues/48)
export interface MessageType {
  id: number;
  title: string;
  content: string;
}
