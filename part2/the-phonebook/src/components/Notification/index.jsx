import "./style.css"

export const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <p className="message-notification">{message}</p>
}
