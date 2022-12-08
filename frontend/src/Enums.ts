export enum EnumProjectType {
  INDIVIDUAL = "INDIVIDUAL",
  ORGANIZATION = "ORGANIZATION",
}

export const enum EnumNotificationStatus {
  // Before Sending
  PENDING = "PENDING",

  // Sending
  SENDING = "SENDING",

  // After Sending
  SUCCESS = "SUCCESS",
  PARTIAL_SUCCESS = "PARTIAL_SUCCESS",
  FAILURE = "FAILURE",
}

export enum EnumNotificationType {
  EMAIL = "EMAIL",
  SMS = "SMS",
  WEBHOOK = "WEBHOOK",
  SLACK = "SLACK",
}

// export namespace EnumNotificationType {
//   // TODO - change to one method like EnumTemplateType
//   export const IndividualNotificationType = () =>
//     [EnumNotificationType.EMAIL, EnumNotificationType.SMS].map((type) =>
//       type.toString()
//     );

//   export const OrganizationNotificationType = () =>
//     [EnumNotificationType.API].map((type) => type.toString());
// }

export enum EnumTemplateType {
  // INDIVIDUAL
  ADVERTISEMENT = "ADVERTISEMENT",
  FIND_PASSWORD = "FIND_PASSWORD",
  JOIN = "JOIN",
  JOIN_COMPLETE = "JOIN_COMPLETE",
  PLAIN_TEXT = "PLAIN_TEXT",

  // ORGANIZATION
}

export namespace EnumTemplateType {
  // FIXME - change type to string or EnumNotificationType
  export function TemplateOf(notificationType?: string): string[] {
    let templates: EnumTemplateType[] = [];
    if (notificationType === EnumNotificationType.EMAIL) {
      templates = [
        EnumTemplateType.ADVERTISEMENT,
        EnumTemplateType.FIND_PASSWORD,
        EnumTemplateType.JOIN,
      ];
    } else if (notificationType === EnumNotificationType.SMS) {
      templates = [EnumTemplateType.JOIN_COMPLETE, EnumTemplateType.PLAIN_TEXT];
    } else if (notificationType === EnumNotificationType.WEBHOOK) {
      templates = [
        EnumTemplateType.ADVERTISEMENT,
        EnumTemplateType.FIND_PASSWORD,
        EnumTemplateType.JOIN,
      ];
    }

    return templates.map((template) => template.toString());
  }
}
