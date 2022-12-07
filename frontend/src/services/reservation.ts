import axios from "axios";


export async function createNotificationConfig(notificationConfig: any)  {
  const response = await axios.post(
    "/api/notification_config",
    notificationConfig
  );
  return response.data.id;
}

export async function createReservation(reservation: any) {
  try {
    const resp = await axios.post("/api/reservation/", reservation);
    return resp.data.id;
  } catch (e: any) {
    console.log(e.response);
    return null;
  }
}