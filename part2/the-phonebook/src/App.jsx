import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filteredPersons, setFilteredPersons] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    const exists = persons.find((person) => person.name === newName)

    if (exists) {
      alert(`${newName} is already added to phonebook`)
    } else if (newName !== "" && newNumber !== "") {
      setPersons((current) =>
        current.concat({ name: newName, number: newNumber })
      )
    }
  }

  const handleChange = (event) => {
    const value = event.target.value
    const target = persons.filter((person) =>
      person.name.toLocaleLowerCase().includes(value.toLowerCase())
    )

    setFilteredPersons(target || null)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with <input onChange={handleChange} type="search" />
      </div>

      <form>
        <div>
          name: <input onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          number:{" "}
          <input onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button onClick={handleSubmit} type="submit">
            add
          </button>
        </div>
      </form>

      <h2>Numbers</h2>

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
    </div>
  )
}

export default App
