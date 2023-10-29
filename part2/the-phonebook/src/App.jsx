import { useEffect, useState } from "react"

import { Filter } from "./components/Filter"
import { PersonForm } from "./components/PersonForm"
import { Persons } from "./components/Persons"
import {
  NotificationSuccess,
  NotificationError,
} from "./components/Notification"

import {
  getAll,
  createPerson,
  updatePerson,
  deletePerson,
} from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filteredPersons, setFilteredPersons] = useState(null)
  const [successfulMessage, setSuccessfulMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    getAll().then((response) => setPersons(response.data))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    const personIndex = persons.findIndex((person) => person.name === newName)
    const targetPerson = persons[personIndex] || null

    if (
      targetPerson &&
      targetPerson.name &&
      targetPerson.number !== newNumber
    ) {
      const result = window.confirm(
        `${targetPerson.name} is already added to phonebook, replace the old number with new one?`
      )

      if (result) {
        const newData = { name: targetPerson.name, number: newNumber }

        updatePerson(targetPerson.id, newData)
          .then((response) => {
            const newData = persons.map((person) =>
              person.id === response.data.id ? response.data : person
            )

            setPersons(newData)
            setFilteredPersons(null)
          })
          .catch((_error) => {
            setErrorMessage(
              `Information of ${newName} hss already been removed from server`
            )
            setTimeout(() => setErrorMessage(null), 3000)
          })
      }
    } else if (targetPerson && targetPerson.name) {
      alert(`${newName} is already added to phonebook`)
    } else if (newName !== "" && newNumber !== "") {
      const newPerson = { name: newName, number: newNumber }

      createPerson(newPerson).then((response) => {
        setPersons((current) => current.concat(response.data))

        setSuccessfulMessage(`Added ${newName}`)
        setTimeout(() => setSuccessfulMessage(null), 3000)
      })
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

    if (findPerson && window.confirm(`Delete ${findPerson.name}`)) {
      deletePerson(findPerson.id).then((response) => {
        const updatedPersons = persons.filter((person) => person.id !== id)
        setPersons(updatedPersons)
        setFilteredPersons(null)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {successfulMessage ? (
        <NotificationSuccess message={successfulMessage} />
      ) : (
        errorMessage && <NotificationError message={errorMessage} />
      )}

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
