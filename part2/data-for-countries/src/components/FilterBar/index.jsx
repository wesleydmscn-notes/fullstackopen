export const FilterBar = ({ handleChange }) => {
  return (
    <>
      find countries
      <input type="text" onChange={handleChange} style={{ marginLeft: "8px" }} />
    </>
  )
}
