import axios from "axios";
import { createReservation, createNotificationConfig } from "./reservation";

describe("reservation services", () => {
  it("should handle create reservation", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.resolve({ data: { id: 1 } }));
    createReservation("test");
  });

  it("should handle create reservation - fail", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject({ response: { data: { id: 1 } } }));
    createReservation("test");
  });

  it("should handle create notification config", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.resolve({ data: { id: 1 } }));
    createNotificationConfig("test");
  });

  it("should handle create notification config - fail", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.reject({ response: { data: { id: 1 } } }));
    createNotificationConfig("test");
  });
});
