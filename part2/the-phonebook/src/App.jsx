import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }])
  const [newName, setNewName] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    if (newName !== "") {
      setPersons((current) => current.concat({ name: newName }))
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
          <button onClick={handleSubmit} type="submit">
            add
          </button>
        </div>
      </form>

      <h2>Numbers</h2>

      {persons.map((person, i) => (
        <p key={`${person}-${i}`}>{person.name}</p>
      ))}
    </div>
  )
}

export default App
