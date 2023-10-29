import "./style.css"

export const NotificationSuccess = ({ message }) => {
  if (message === null) {
    return null
  }

  return <p className="message-notification success">{message}</p>
}

export const NotificationError = ({ message }) => {
  if (message === null) {
    return null
  }

  return <p className="message-notification error">{message}</p>
}