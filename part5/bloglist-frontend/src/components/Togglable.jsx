import { useImperativeHandle, useState } from "react"

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => { setVisible(!visible) }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={{ display: visible ? 'none' : '' }}>
        <button onClick={toggleVisibility}>{props.showButtonLabel}</button>
      </div>
      <div style={{ display: visible ? '' : 'none' }}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )

}

export default Togglable