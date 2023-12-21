import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notifications)
  const style = {
    border: "solid",
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
  }

  return notification && <div style={style}>{notification}</div>
}

export default Notification
