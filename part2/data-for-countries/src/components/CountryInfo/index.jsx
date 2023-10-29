import { useState, useEffect } from "react"
import { getWeatherCountryInfo } from "../../services/fetchWeatherInfo"

export const CountryInfo = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState({
    name: "",
    temp: "",
    speed: "",
    description: "",
  })

  const { name, capital, area, languages, flags } = country
  const countryLanguages = Object.values(languages)

  useEffect(() => {
    getWeatherCountryInfo(capital[0]).then((response) => {
      const {
        name,
        main: { temp },
        wind: { speed },
        weather,
      } = response

      setWeatherInfo({ name, temp: Math.floor(Number(temp) - 273.15), speed, description: weather[0].description })
    })
  }, [])

  return (
    <div>
      <h2>{name.common}</h2>

      <p>capital: {capital[0]}</p>
      <p>area: {area}</p>

      <h3>languages:</h3>

      <ul>
        {countryLanguages.map((language, i) => (
          <li key={`${name}-${language}-${i}`}>{language}</li>
        ))}
      </ul>

      <img width={350} src={flags.svg} alt={flags.alt} />

      <h2>Weather in {weatherInfo.name}</h2>

      <p>temperature: {weatherInfo.temp}° Celsius</p>
      <p>description: {weatherInfo.description}</p>
      <p>wind: {weatherInfo.speed} m/s</p>
    </div>
  )
}
