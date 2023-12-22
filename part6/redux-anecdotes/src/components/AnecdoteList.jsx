import { useSelector, useDispatch } from "react-redux"

import { addVotes } from "../reducers/anecdoteReducer"
import { setNotification, hideNotification } from "../reducers/notificationReducer"

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

  const vote = async (id, content) => {
    console.log("vote", id)

    dispatch(addVotes(id))
    dispatch(setNotification(`You voted for "${content}" !`, 5))

    setTimeout(() => {
      dispatch(hideNotification())
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
