import axios from "axios";


export async function deleteTarget(targetId: number) {
  try {
    return await axios.delete(`/api/targetuser/${targetId}`);
  } catch (e: any) {
    console.log(e.response);
  }
}
