import { useState, useEffect, useRef } from "react"

import Blog from "./components/Blog"
import Login from "./components/Login"
import CreateBlog from "./components/CreateBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

import blogService from "./services/blogs"
import loginService from "./services/login"

import "./App.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [changeMessage, setChangeMessage] = useState(null)

  const createBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedBlogappUser")

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      localStorage.setItem("loggedBlogappUser", JSON.stringify(user))

      blogService.setToken(user.token)

      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMessage("Wrong username or password")

      setTimeout(() => {
        setErrorMessage(null)
      }, 2500)
    }
  }

  if (user === null) {
    return (
      <Login
        username={username}
        password={password}
        handleChangeUsername={({ target }) => setUsername(target.value)}
        handleChangePassword={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
        errorMessage={errorMessage}
      />
    )
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedBlogappUser")
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const { title, author, url, likes, clearFields } = createBlogRef.current
      const returnedBlog = await blogService.create({
        title,
        author,
        url,
        likes,
        user: user.name,
      })

      setBlogs(() => blogs.concat(returnedBlog))
      setChangeMessage(`A new blog ${title} by ${author} added`)

      clearFields()

      setTimeout(() => {
        setChangeMessage(null)
      }, 2500)
    } catch (exception) {
      setErrorMessage("Something wrong, please fill in all fields correctly.")

      setTimeout(() => {
        setErrorMessage(null)
      }, 2500)
    }
  }

  return (
    <div>
      <h2>blogs</h2>

      {changeMessage && <Notification message={changeMessage} style="change" />}
      {errorMessage && <Notification message={errorMessage} style="error" />}

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="new blog">
        <CreateBlog ref={createBlogRef} onSubmit={handleCreateBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
