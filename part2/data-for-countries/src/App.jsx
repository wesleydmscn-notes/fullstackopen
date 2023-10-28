import { useEffect, useState } from "react"

import { FilterBar } from "./components/FilterBar"
import { CountryInfo } from "./components/CountryInfo"

import { getAllCountries } from "./services/fetchCountries"

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    getAllCountries().then((data) => setCountries(data))
  }, [])

  function handleChange(event) {
    const value = event.target.value

    if (countries) {
      const foundCountries = countries.filter((country) =>
        country.name.common.includes(value)
      )

      setFilteredCountries(foundCountries)
    }
  }

  return (
    <>
      <FilterBar handleChange={handleChange} />

      {filteredCountries.length === 1 ? (
        filteredCountries.map((country, i) => <CountryInfo key={`${country.name.common}-${i}`} country={country} />)
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        filteredCountries.map((country, i) => <p key={`${country.name.official}-${i}`}>{country.name.common}</p>)
      )}
    </>
  )
}

export default App
