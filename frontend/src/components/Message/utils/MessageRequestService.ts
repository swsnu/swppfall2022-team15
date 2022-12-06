import { EnumNotificationType } from "../../../Enums";
import { createMessage } from "../../../services/message";
import { Data, SlackData } from "../../../types";

export const messageCreateService = async (
  notificationType: string,
  name: string,
  data: Data,
  oldFieldErrors: any
) => {
  switch (notificationType) {
    case EnumNotificationType.SLACK:
      data = data as SlackData;
      if (
        "channel" in data &&
        "message" in data &&
        Boolean(data.channel) &&
        Boolean(data.message)
      ) {
        await createMessage(notificationType, name, data);
      } else {
        let newFieldErrors = oldFieldErrors;
        if (!Boolean(data.channel)) {
          newFieldErrors = {
            ...newFieldErrors,
            channel: "This field is required.",
          };
        }
        if (!Boolean(data.message)) {
          newFieldErrors = {
            ...newFieldErrors,
            message: "This field is required.",
          };
        }
        return newFieldErrors;
      }
      break;
    // case EnumNotificationType.EMAIL:
  }
};
