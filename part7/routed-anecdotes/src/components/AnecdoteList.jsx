import { useContext } from "react"

import { AnecdoteContext } from "../contexts/Anecdotes"

export const AnecdoteList = () => {
  const { anecdotes } = useContext(AnecdoteContext)

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>{anecdote.content}</li>
        ))}
      </ul>
    </div>
  )
}
