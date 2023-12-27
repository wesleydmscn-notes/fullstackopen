import axios from "axios"
import { useState, useEffect } from "react"

export const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    async function getCountry(url) {
      const response = await axios.get(`${url}/${name}`)
      setCountry({ ...response.data, found: true })
    }

    if (name.length !== 0) {
      getCountry("https://studies.cs.helsinki.fi/restcountries/api/name")
    }

  }, [name])

  return country
}
