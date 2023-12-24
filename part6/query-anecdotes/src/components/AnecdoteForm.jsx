import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useNotificationDispatch } from "../contexts/NotificationContext"
import { createAnecdote, getId } from "../services/anecdotes"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote))
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value

    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })

    event.target.anecdote.value = ""
    console.log("new anecdote added:", content)

    await dispatch({ type: "showNotification", payload: `You added: ${content} !` })

    setTimeout(() => {
      dispatch({ type: "hideNotification" })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
