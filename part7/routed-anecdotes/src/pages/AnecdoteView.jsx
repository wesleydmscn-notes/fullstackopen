import { useLocation } from "react-router-dom"

export const AnecdoteView = () => {
  const { state } = useLocation()

  return (
    <>
      <h1>{state.anecdote.content}</h1>
      <span>has {state.anecdote.votes} votes</span>

      <p>
        for more info see: <a href="#">{state.anecdote.info}</a>
      </p>
    </>
  )
}
