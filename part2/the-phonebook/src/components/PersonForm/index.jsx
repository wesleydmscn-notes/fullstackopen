export const PersonForm = ({ setNewName, setNewNumber, handleSubmit }) => {
  return (
    <form>
      <div>
        name: <input onChange={(event) => setNewName(event.target.value)} />
      </div>
      <div>
        number: <input onChange={(event) => setNewNumber(event.target.value)} />
      </div>
      <div>
        <button onClick={handleSubmit} type="submit">
          add
        </button>
      </div>
    </form>
  )
}
