import { Person } from "./Person"

export const Persons = ({ filteredPersons, persons, handleClick }) => {
  return (
    <>
      {filteredPersons
        ? filteredPersons.map((person, i) => (
            <Person
              key={`${person}-${i}`}
              id={person.id}
              name={person.name}
              number={person.number}
              handleClick={handleClick}
            />
          ))
        : persons.map((person, i) => (
            <Person
              key={`${person}-${i}`}
              id={person.id}
              name={person.name}
              number={person.number}
              handleClick={handleClick}
            />
          ))}
    </>
  )
}
