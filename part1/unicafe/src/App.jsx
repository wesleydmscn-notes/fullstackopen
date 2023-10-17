import { useState } from "react"

export const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const sum = good + neutral + bad

  function handleClick(feedbackType) {
    const feedbackOptions = {
      good: () => setGood((current) => current + 1),
      neutral: () => setNeutral((current) => current + 1),
      bad: () => setBad((current) => current + 1),
    }

    const currentOption = feedbackOptions[feedbackType]
    
    currentOption()
  }

  return (
    <>
      <h1>give feedback</h1>

      <button onClick={() => handleClick("good")}>good</button>
      <button onClick={() => handleClick("neutral")}>neutral</button>
      <button onClick={() => handleClick("bad")}>bad</button>

      <h1>statistics</h1>

      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {sum}</p>
      <p>average: {(good * 1 + neutral * 0 + bad * -1) / (sum) || 0}</p>
      <p>positive: {(good / (sum)) * 100 || 0}%</p>
    </>
  )
}
