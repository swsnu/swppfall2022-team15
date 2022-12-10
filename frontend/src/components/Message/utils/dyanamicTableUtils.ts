export const getTargetColumns = (notificationType: string ) => {
    switch(notificationType) {
        case "SLACK":
          return ['Id', 'Name', 'API Token']
        case "EMAIL":
          return ['Id', 'Name', 'Email Address']
        case "SMS":
          return ['Id', 'Name', 'Phone Number']
        case "WEBHOOK":
          return ['Id', 'Name', 'URL', 'Authorization']
    }
    return [""]
  }

export const getTargetKeys = (notificationType: string ) => {
    switch(notificationType) {
      case "SLACK":
        return ['id', 'name', 'data.api_key']
      case "EMAIL":
        return ['id', 'name', 'endpoint']
      case "SMS":
        return ['id', 'name', 'endpoint']
      case "WEBHOOK":
        return ['id', 'name', 'endpoint', 'data.auth']
    }
    return [""]
  }

export const getMessageColumns = (notificationType: string ) => {
    switch(notificationType) {
        case "SLACK":
          return ["Id", "Name", "Channel", "Message"]
        case "EMAIL":
          return ["Id", "Name", "Title", "Message"]
        case "WEBHOOK":
          return ["Id", "Name", "Request Body  ( JSON )"]
        case "SMS":
          return ["Id", "Name", "Message"]
    }
    return [""]
  }

export const getMessageKeys = (notificationType: string ) => {
    switch(notificationType) {
      case "SLACK":
        return ["id", "name", "data.channel", "data.message"]
      case "EMAIL":
        return ["id", "name", "data.title", "data.message"]
      case "SMS":
        return ["id", "name", "data.message"]
      case "WEBHOOK":
        return ["id", "name", "data.message"]
    }
    return [""]
  }


export const defaultInDepthFieldParser = (key: string, row: any) => {
  const fields = key.split(".");
  let value = row;
  fields.forEach((field) => {
      value = value[field];
  });
  return value;
};