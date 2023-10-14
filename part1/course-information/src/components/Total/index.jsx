export const Total = ({ exercises }) => {
  const total = exercises.reduce((acc, curr) => acc + curr.exercises, 0)
  return <p>Number of exercises {total}</p>
}
