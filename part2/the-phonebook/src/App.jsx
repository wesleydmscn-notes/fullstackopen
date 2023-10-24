import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "88 9900-0000" },
  ])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

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

  return (
    <div>
      <h2>Phonebook</h2>

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

      {persons.map((person, i) => (
        <p key={`${person}-${i}`}>{person.name} {person.number}</p>
      ))}
    </div>
  )
}

export default App
