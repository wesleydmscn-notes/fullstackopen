import { Part } from "../Part"

export const Content = ({ part }) => {
  return (
    <div>
      <Part content={part.part1} />
      <Part content={part.part2} />
      <Part content={part.part3} />
    </div>
  )
}
