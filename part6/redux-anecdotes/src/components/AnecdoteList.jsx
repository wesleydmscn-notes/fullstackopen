import { useSelector, useDispatch } from "react-redux"

import { addVotes } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filters === null) {
      return state.anecdotes.sort((a, b) => b.votes - a.votes)
    }

    return state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filters.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes)
  })

  const dispatch = useDispatch()

  const vote = (id, content) => {
    console.log("vote", id)
    dispatch(addVotes(id))
    dispatch(showNotification(`You voted for "${content}" !`))

    setTimeout(() => {
      dispatch(showNotification(null))
    }, 5000)
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}
