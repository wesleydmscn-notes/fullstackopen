export const Persons = ({ filteredPersons, persons }) => {
  return (
    <>
      {filteredPersons
        ? filteredPersons.map((person, i) => (
            <p key={`${person}-${i}`}>
              {person.name} {person.number}
            </p>
          ))
        : persons.map((person, i) => (
            <p key={`${person}-${i}`}>
              {person.name} {person.number}
            </p>
          ))}
    </>
  )
}
