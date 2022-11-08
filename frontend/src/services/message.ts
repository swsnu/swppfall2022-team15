import axios from "axios";

export async function createMessage(title: string, content: string) {
  try {
    const resp = await axios.post("/api/message/", {
      title: title,
      content: content,
    });
    return resp.data.id;
  } catch (e: any) {
    console.log(e.response);
    return null;
  }
}

export async function deleteMessage(messageId: number) {
  try {
    return await axios.delete(`/api/message/${messageId}`);
  } catch (e: any) {
    console.log(e.response);
  }
}
