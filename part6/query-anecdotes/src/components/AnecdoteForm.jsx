import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote, getId } from "../services/anecdotes"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote))
    },
  })

  const onCreate = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value

    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })

    event.target.anecdote.value = ""
    console.log("new anecdote added:", content)
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
