import { useState } from "react"
import { Statistics } from "./components/Statistics"

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

      {sum !== 0 ? (
        <Statistics feedbacks={{ good, neutral, bad, sum }} />
      ) : (
        <p>No feedback given</p>
      )}
    </>
  )
}
