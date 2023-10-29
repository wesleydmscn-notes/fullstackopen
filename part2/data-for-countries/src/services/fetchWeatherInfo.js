const api_key = import.meta.env.VITE_OPENWEATHER_KEY

async function getWeatherCountryInfo(capital) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
  )
  const data = await response.json()

  return data
}

export { getWeatherCountryInfo }
