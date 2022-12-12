export const getTargetColumns = (notificationType: string) => {
  switch (notificationType) {
    case "SLACK":
      return ["Name", "API Token"];
    case "EMAIL":
      return ["Name", "Email Address"];
    case "SMS":
      return ["Name", "Phone Number"];
    case "WEBHOOK":
      return ["Name", "URL", "Authorization"];
  }
  return [""];
};

export const getTargetKeys = (notificationType: string) => {
  switch (notificationType) {
    case "SLACK":
      return ["name", "data.api_key"];
    case "EMAIL":
      return ["name", "endpoint"];
    case "SMS":
      return ["name", "endpoint"];
    case "WEBHOOK":
      return ["name", "endpoint", "data.auth"];
  }
  return [""];
};

export const getMessageColumns = (notificationType: string) => {
  switch (notificationType) {
    case "SLACK":
      return ["Name", "Channel", "Message"];
    case "EMAIL":
      return ["Name", "Title", "Message"];
    case "WEBHOOK":
      return ["Name", "Request Body  ( JSON )"];
    case "SMS":
      return ["Name", "Message"];
  }
  return [""];
};

export const getMessageKeys = (notificationType: string) => {
  switch (notificationType) {
    case "SLACK":
      return ["name", "data.channel", "data.message"];
    case "EMAIL":
      return ["name", "data.title", "data.message"];
    case "SMS":
      return ["name", "data.message"];
    case "WEBHOOK":
      return ["name", "data.message"];
  }
  return [""];
};

export const defaultInDepthFieldParser = (key: string, row: any) => {
  const fields = key.split(".");
  let value = row;
  fields.forEach((field) => {
    value = value[field];
  });
  return value;
};
