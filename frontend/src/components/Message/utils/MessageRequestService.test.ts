import { messageCreateService } from "./MessageRequestService";

describe("MessageRequestService", () => {
  it("should handle slack data", async () => {
    const data = {
      channel: "test",
      message: "test",
    };
    const oldFieldErrors = {};
    const result = await messageCreateService(
      "SLACK",
      "test",
      data,
      oldFieldErrors
    );
    expect(result).toBe(undefined);
  });

    it("should handle slack data with missing channel", async () => {
    const data = {
      channel: "",
      message: "test",
    };
    const oldFieldErrors = {};
    const result = await messageCreateService(
        "SLACK",
        "test",
        data,
        oldFieldErrors
    );
    expect(result).toEqual({ channel: "This field is required." });
    });

    it("should handle slack data with missing message", async () => {
    const data = {
      channel: "test",
      message: "",
    };
    const oldFieldErrors = {};
    const result = await messageCreateService(
        "SLACK",
        "test",
        data,
        oldFieldErrors
    );
    expect(result).toEqual({ message: "This field is required." });
    });
});
