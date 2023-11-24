import PropTypes from "prop-types"

function Notification({ message, style }) {
  if (message === null) {
    return null
  }

  return <div className={style}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string]),
  style: PropTypes.string.isRequired
}

export default Notification
