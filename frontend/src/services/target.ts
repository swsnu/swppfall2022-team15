import axios from "axios";
import { TargetType } from "../types";


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
