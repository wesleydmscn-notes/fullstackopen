import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }
  const blogStyle = {
    marginBottom: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingInline: 4,
    borderWidth: 1,
    border: "solid",
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={toggleVisibility} style={{ marginLeft: 8 }}>view</button>
      </div>

      <div style={showWhenVisible}>
        <p style={{ margin: 0 }}>{blog.title}</p>
        <p>{blog.author}</p>
        <p>likes: {blog.likes}</p>
        <p>{blog.url}</p>

        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
}

export default Blog
