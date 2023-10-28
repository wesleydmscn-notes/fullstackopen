export const CountryInfo = ({ country }) => {
  const { name, capital, area, languages, flags } = country
  const countryLanguages = Object.values(languages)

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

      <img src={flags.png} alt={flags.alt} />
    </div>
  )
}
