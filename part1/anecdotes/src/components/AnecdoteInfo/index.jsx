export const AnecdoteInfo = ({ content, votes }) => {
  return (
    <>
      <p>{content}</p>
      <p>has {votes} votes</p>
    </>
  )
}