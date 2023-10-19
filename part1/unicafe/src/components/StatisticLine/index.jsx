export const StatisticLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <tr>
        <td>{text}:</td>
        <td>{value}%</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  )
}
