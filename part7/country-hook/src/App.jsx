import { useState } from "react"

import { Country } from "./components/Country"

import { useField, useCountry } from "./hooks"

export const App = () => {
  const [name, setName] = useState("")

  const nameInput = useField("text")
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}
