import { useState } from "react"

function Togglable(props) {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} style={{ marginBottom: 16 }}>
          {props.buttonLabel}
        </button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility} style={{ marginBottom: 16 }}>
          cancel
        </button>
      </div>
    </>
  )
}

export default Togglable
