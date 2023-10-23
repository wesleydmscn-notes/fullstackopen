import { Part } from "../Part"

export const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} content={part} />
      ))}
    </div>
  )
}
