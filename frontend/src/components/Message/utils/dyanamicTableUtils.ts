export const getTargetColumns = (notificationType: string ) => {
    switch(notificationType) {
        case "SLACK":
          return ['Id', 'Name', 'API-KEY']
        case "EMAIL":
          return ['Id', 'Name', 'ADDRESS']
        case "SMS":
          return ['Id', 'Name', 'PHONE NUMBER', 'COUNTRY CODE']
        case "WEBHOOK":
          return ['Id', 'Name', 'URL', 'AUTH']
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
        return ['id', 'name', 'endpoint', 'data.country_code']
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
