import { useNavigate } from "react-router-dom"
import { useContext } from "react"

import { useField } from "../hooks"
import { AnecdoteContext } from "../contexts/Anecdotes"

export const CreateNew = () => {
  const navigate = useNavigate()
  const { addNew, dispatchNotification } = useContext(AnecdoteContext)
  const formFields = useField("text")

  const handleSubmit = (e) => {
    e.preventDefault()

    addNew({
      content: formFields.content,
      author: formFields.author,
      info: formFields.info,
      votes: 0,
    })

    dispatchNotification(`a new anecdote ${formFields.content} created!`)
    navigate("/")
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={formFields.content}
            onChange={formFields.onChangeContent}
          />
        </div>

        <div>
          author
          <input
            name="author"
            value={formFields.author}
            onChange={formFields.onChangeAuthor}
          />
        </div>

        <div>
          url for more info
          <input name="info" value={formFields.info} onChange={formFields.onChangeInfo} />
        </div>

        <button>create</button>
      </form>
    </div>
  )
}
