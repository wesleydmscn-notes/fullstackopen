export const Total = ({ exercises }) => {
  const listOfExercises = exercises.map((part) => part.exercises)
  const sum = listOfExercises.reduce((acc, curr) => acc + curr, 0)

  return <h3>Total of {sum} exercises</h3>
}
