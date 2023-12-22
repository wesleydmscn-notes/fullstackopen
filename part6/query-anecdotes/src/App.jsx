import { useQuery } from "@tanstack/react-query"
import { getAnecdotes } from "./services/anecdotes"

import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"

const App = () => {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  })

  const handleVote = (anecdote) => {
    console.log("vote")
  }

  if (result.isLoading) {
    return <p>loading data...</p>
  }

  if (result.isError) {
    return <p>anecdote service not available due to problems in server</p>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
