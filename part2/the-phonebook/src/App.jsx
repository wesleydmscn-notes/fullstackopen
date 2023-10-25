import axios from "axios"
import { useEffect, useState } from "react"

import { Filter } from "./components/Filter"
import { PersonForm } from "./components/PersonForm"
import { Persons } from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filteredPersons, setFilteredPersons] = useState(null)

  useEffect(() => {
    const eventHandler = response => {
      setPersons(response.data)
    }

    const promise = axios.get("http://localhost:3001/persons")
    
    promise.then(eventHandler)
  }, [])

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

    if (target.length > 0 && value !== "") {
      setFilteredPersons(target)
    } else {
      setFilteredPersons(null)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleChange={handleChange} />

      <PersonForm
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} persons={persons} />
    </div>
  )
}

export default App
