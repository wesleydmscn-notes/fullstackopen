export const Person = ({ id, name, number, handleClick }) => {
  return (
    <p>
      {name} {number}{" "}
      <button onClick={() => handleClick(id)}>delete</button>
    </p>
  )
}
