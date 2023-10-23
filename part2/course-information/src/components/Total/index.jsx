export const Total = ({ exercises }) => {
  const total = exercises.reduce((acc, curr) => acc + curr.exercises, 0)
  return <h3>Total of {total} exercises</h3>
}
