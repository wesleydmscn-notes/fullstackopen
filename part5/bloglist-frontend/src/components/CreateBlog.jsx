import { useState, forwardRef, useImperativeHandle } from "react"

const CreateBlog = forwardRef((props, refs) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setURL] = useState("")
  const [likes, setLikes] = useState("")

  function clearFields() {
    setTitle("")
    setAuthor("")
    setURL("")
    setLikes("")
  }

  useImperativeHandle(refs, () => {
    return { title, author, url, likes, clearFields }
  })

  return (
    <>
      <h2>create new blog:</h2>

      <form onSubmit={props.onSubmit}>
        <div>
          <label>title:</label>
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          <label>author:</label>
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          <label>url:</label>
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>

        <div>
          <label>likes:</label>
          <input
            type="number"
            value={likes}
            name="Likes"
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </>
  )
})

export default CreateBlog
