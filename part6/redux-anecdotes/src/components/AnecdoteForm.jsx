import { useDispatch } from "react-redux"

import { createAnecdote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmitAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value

    dispatch(createAnecdote(content))
    dispatch(showNotification(`You added "${content}"!`))

    event.target.anecdote.value = ""

    setTimeout(() => {
      dispatch(showNotification(null))
    }, 5000)
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
