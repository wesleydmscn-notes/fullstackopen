import { Part } from "../Part"

export const Content = ({ part }) => {
  return (
    <div>
      <Part content={part[0]} />
      <Part content={part[1]} />
      <Part content={part[2]} />
    </div>
  )
}
