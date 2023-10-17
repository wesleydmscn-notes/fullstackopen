import { StatisticLine } from "../StatisticLine"

export const Statistics = ({ feedbacks: { good, neutral, bad, sum }}) => {
  const average = (good * 1 + neutral * 0 + bad * -1) / sum
  const positive = (good / sum) * 100

  return (
    <>
      <h1>statistics</h1>

      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />

      <StatisticLine text="all" value={sum} />

      <StatisticLine text="average" value={average || 0} />
      <StatisticLine text="positive" value={positive || 0} />
    </>
  )
}
