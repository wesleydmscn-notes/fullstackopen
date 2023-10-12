export const Part = ({ content }) => {
  const { name, exercises } = content
  return (
    <p>
      {name} {exercises}
    </p>
  )
}
