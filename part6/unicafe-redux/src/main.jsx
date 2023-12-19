import React from "react"
import ReactDOM from "react-dom/client"

import { createStore } from "redux"
import reducer from "./reducer"

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    })
  }

  const ok = () => {
    store.dispatch({
      type: "OK",
    })
  }

  const bad = () => {
    store.dispatch({
      type: "BAD",
    })
  }

  const zero = () => {
    store.dispatch({
      type: "ZERO",
    })
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "calc(100vh - 5rem)",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1>Unicafe</h1>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button style={{ backgroundColor: "greenyellow" }} onClick={good}>
          good+
        </button>

        <button style={{ backgroundColor: "orange" }} onClick={ok}>
          ok+
        </button>

        <button style={{ backgroundColor: "rosybrown" }} onClick={bad}>
          bad+
        </button>

        <button onClick={zero}>reset stats</button>
      </div>

      <div style={{ display: "flex", gap: "2rem" }}>
        <p style={{ fontSize: "1.5rem" }}>
          <strong>good</strong> {store.getState().good}
        </p>

        <p style={{ fontSize: "1.5rem" }}>
          <strong>ok</strong> {store.getState().ok}
        </p>

        <p style={{ fontSize: "1.5rem" }}>
          <strong>bad</strong> {store.getState().bad}
        </p>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
