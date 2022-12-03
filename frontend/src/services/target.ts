import axios from "axios";
import { TargetType } from "../types";

export async function createTarget(
  targetName: string,
  messageType: string,
  endPoint: string
) {
  try {
    const resp = await axios.post("/api/target/", {
      target_name: targetName,
      message_type: messageType,
      end_point: endPoint,
    });
    return resp.data.id;
  } catch (e: any) {
    console.log(e.response);
    return null;
  }
}

export async function deleteTarget(targetId: number) {
  try {
    return await axios.delete(`/api/targetuser/${targetId}/`);
  } catch (e: any) {
    console.log(e.response);
  }
}

export async function fetchTargets(notification_type: string) {
  try {
    return await axios.get<TargetType[]>(
      `/api/targetuser/?notification_type=${notification_type}`
    );
  } catch (e: any) {
    console.log(e.response);
  }
}
