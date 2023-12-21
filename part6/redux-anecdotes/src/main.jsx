import ReactDOM from "react-dom/client"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

import App from "./App"

import reducer from "./reducers/anecdoteReducer"
import filterReducer from "./reducers/filterReducer"

const store = configureStore({
  reducer: {
    anecdotes: reducer,
    filters: filterReducer,
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
)
