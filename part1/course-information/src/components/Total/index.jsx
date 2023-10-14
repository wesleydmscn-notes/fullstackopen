export const Total = ({ exercises }) => {
  const { part1, part2, part3 } = exercises
  const total = [part1.exercises, part2.exercises, part3.exercises].reduce((acc, curr) => acc + curr, 0)
  
  return <p>Number of exercises {total}</p>
}
