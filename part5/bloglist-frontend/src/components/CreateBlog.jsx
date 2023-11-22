function CreateBlog(props) {
  const {
    handleChangeTitle,
    handleChangeAuthor,
    handleChangeURL,
    handleChangeLikes,
    handleSubmit,
    values,
  } = props

  return (
    <div>
      <h2>create new blog:</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <div>
          <label>title:</label>
          <input
            type="text"
            value={values.title}
            name="Title"
            onChange={handleChangeTitle}
          />
        </div>

        <div>
          <label>author:</label>
          <input
            type="text"
            value={values.author}
            name="Author"
            onChange={handleChangeAuthor}
          />
        </div>

        <div>
          <label>url:</label>
          <input
            type="text"
            value={values.url}
            name="URL"
            onChange={handleChangeURL}
          />
        </div>

        <div>
          <label>likes:</label>
          <input
            type="number"
            value={values.likes}
            name="Likes"
            onChange={handleChangeLikes}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog
