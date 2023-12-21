import { useDispatch } from "react-redux"

import { addNewAnecdote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmitAnecdote = (event) => {
    event.preventDefault()

    dispatch(addNewAnecdote(event.target.anecdote.value))
    dispatch(showNotification(`You added "${event.target.anecdote.value}"!`))

    event.target.anecdote.value = ""
  }

  return (
    <>
      <h2>create new</h2>

      <form onSubmit={handleSubmitAnecdote}>
        <div>
          <input name="anecdote" />
        </div>

        <button type="submit">create</button>
      </form>
    </>
  )
}
