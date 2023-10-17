export function Statistics({ feedbacks: { good, neutral, bad, sum }}) {
  return (
    <>
      <h1>statistics</h1>

      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>

      <p>all: {sum}</p>
      
      <p>average: {(good * 1 + neutral * 0 + bad * -1) / sum || 0}</p>
      <p>positive: {(good / sum) * 100 || 0}%</p>
    </>
  )
}
