const baseurl = "https://studies.cs.helsinki.fi/restcountries/api"

async function getAllCountries() {
  const response = await fetch(`${baseurl}/all`)
  const data = await response.json()

  return data
}

export { getAllCountries }