const Notification = ({ message, color }) => {
  let style = {
    color: color,
    background: 'lightgrey',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (message) {
    return <div style={style}>{message}</div>
  } else {
    return <></>
  }
}

export default Notification