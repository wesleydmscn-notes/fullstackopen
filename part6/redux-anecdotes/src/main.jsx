import ReactDOM from "react-dom/client"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

import App from "./App"

import reducer, { setNotes } from "./reducers/anecdoteReducer"
import filterReducer from "./reducers/filterReducer"
import notificationReducer from "./reducers/notificationReducer"

import anecdoteService from "./services/anecdotes"

const store = configureStore({
  reducer: {
    anecdotes: reducer,
    filters: filterReducer,
    notifications: notificationReducer,
  },
})

anecdoteService.getAll().then((notes) => store.dispatch(setNotes(notes)))

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
)
