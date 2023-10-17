export const StatisticLine = ({ text, value }) => {
  if (text === "positive") {
    return <p>{text}: {value}%</p>
  }
  
  return <p>{text}: {value}</p>
}