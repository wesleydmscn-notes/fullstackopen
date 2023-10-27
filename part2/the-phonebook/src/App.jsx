import { useEffect, useState } from "react"

import { Filter } from "./components/Filter"
import { PersonForm } from "./components/PersonForm"
import { Persons } from "./components/Persons"

import { getAll, createPerson, deletePerson } from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filteredPersons, setFilteredPersons] = useState(null)

  useEffect(() => {
    getAll().then((response) => setPersons(response.data))
  }, [persons])

  const handleSubmit = (event) => {
    event.preventDefault()

    const exists = persons.find((person) => person.name === newName)

    if (exists) {
      alert(`${newName} is already added to phonebook`)
    } else if (newName !== "" && newNumber !== "") {
      const newPerson = { name: newName, number: newNumber }

      createPerson(newPerson)
      setPersons((current) => current.concat(newPerson))
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

  const handleDelete = (id) => {
    const findPerson = persons.find((person) => person.id === id)

    console.log(id)

    if (window.confirm(`Delete ${findPerson.name}`)) {
      const updatedPersons = persons.filter((person) => person.id !== id)

      setPersons(updatedPersons)
      deletePerson(id)
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

      <Persons
        filteredPersons={filteredPersons}
        persons={persons}
        handleClick={handleDelete}
      />
    </div>
  )
}

export default App
