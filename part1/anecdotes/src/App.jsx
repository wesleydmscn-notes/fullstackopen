import { useState } from "react"

import { Title } from "./components/Title"
import { AnecdoteInfo } from "./components/AnecdoteInfo"
import { Button } from "./components/Button"
import { MostVoted } from "./components/MostVoted"

export const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const handleClickNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleClickVote = () => {
    const newPoints = [...points]
    newPoints[selected] += 1

    setPoints(newPoints)
  }

  const maxPoints = Math.max(...points)
  const anecdoteIndex = points.indexOf(maxPoints)

  return (
    <>
      <Title content="Anecdote of the day" />
      <AnecdoteInfo content={anecdotes[selected]} votes={points[selected]} />

      <Button name="vote" handleClick={handleClickVote} />
      <Button name="next anecdotes" handleClick={handleClickNext} />

      <Title content="Anecdote with most votes" />
      <MostVoted anecdote={anecdotes[anecdoteIndex]} votes={maxPoints} />
    </>
  )
}
