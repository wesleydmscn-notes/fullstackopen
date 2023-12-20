import ReactDOM from "react-dom/client"
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"

import App from "./App"

import reducer from "./reducers/anecdoteReducer"
import filterReducer from "./reducers/filterReducer"

const reducerCombined = combineReducers({
  anecdotes: reducer,
  filters: filterReducer,
})

const store = createStore(reducerCombined)

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
)
