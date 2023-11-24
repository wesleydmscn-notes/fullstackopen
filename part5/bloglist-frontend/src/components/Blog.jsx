import { useState } from "react"

const Blog = ({ blog, onLikePost, onDeletePost, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }
  const blogStyle = {
    marginBottom: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingInline: 4,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="blog-post" style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={toggleVisibility} style={{ marginLeft: 8 }}>
          view
        </button>
      </div>

      <div style={showWhenVisible}>
        <span>
          {blog.title}
          <button onClick={toggleVisibility} style={{ marginLeft: 8 }}>
            hide
          </button>
        </span>

        <p>{blog.author}</p>

        <span>
          likes: {blog.likes}
          <button onClick={onLikePost} style={{ marginLeft: 8 }}>
            like
          </button>
        </span>

        <br />
        <br />

        <a href={blog.url} target="_blank">
          {blog.url}
        </a>

        <br />

        {user && (
          <button onClick={onDeletePost} style={{ marginTop: 8 }}>
            remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
