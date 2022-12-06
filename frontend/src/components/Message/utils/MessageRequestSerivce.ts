import {EnumNotificationType} from "../../../Enums";
import {createMessage} from "../../../services/message";
import {Content, SlackContent} from "../../../types";

export const messageCreateService = async (notificationType: string, name: string, content: Content, oldFieldErrors: any) => {
  switch (notificationType) {
    case EnumNotificationType.SLACK:
      content = content as SlackContent;
      if (
        "channel" in content &&
        "message" in content &&
        Boolean(content.channel) &&
        Boolean(content.message)
      )
        await createMessage(notificationType, {
          channel: content.channel,
          message: content.message,
        });
      else {
        let newFieldErrors = oldFieldErrors;
        if (!Boolean(content.channel)) {
          newFieldErrors = {
            ...newFieldErrors,
            channel: "This field is required.",
          };
        }
        if (!Boolean(content.message)) {
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
}
