import { useNotificationMsg } from "../notificationContext"

const Notification = () => {
  const msg = useNotificationMsg()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    msg ?
    <div style={style}>
      {msg}
    </div>
    :
    null
  )
}

export default Notification
