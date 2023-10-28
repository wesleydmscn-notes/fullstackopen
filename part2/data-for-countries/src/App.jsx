import { useEffect, useState } from "react"

import { FilterBar } from "./components/FilterBar"
import { CountryInfo } from "./components/CountryInfo"

import { getAllCountries } from "./services/fetchCountries"

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])
  const [showCountry, setShowCountry] = useState("")

  useEffect(() => {
    getAllCountries().then((data) => setCountries(data))
  }, [])

  function handleChange(event) {
    const value = event.target.value

    if (countries) {
      const foundCountries = countries.filter((country) =>
        country.name.common.includes(value)
      )

      foundCountries.length < 10 && setFilteredCountries(foundCountries)
    }
  }

  return (
    <>
      <FilterBar handleChange={handleChange} />

      {filteredCountries.length === 1 ? (
        <CountryInfo
          key={`${filteredCountries[0].name.common}`}
          country={filteredCountries[0]}
        />
      ) : (
        filteredCountries.map((country, i) => (
          <div key={`${country.name.official}-${i}`}>
            <span>{country.name.common} </span>
            <button onClick={() => setShowCountry(country.name.common)}>
              show
            </button>

            {showCountry === country.name.common && <CountryInfo country={country} />}
          </div>
        ))
      )}

    </>
  )
}

export default App
