import { useState, useEffect } from "react"

import Blog from "./components/Blog"
import Login from "./components/Login"
import CreateBlog from "./components/CreateBlog"
import Notification from "./components/Notification"

import blogService from "./services/blogs"
import loginService from "./services/login"

import "./App.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setURL] = useState("")
  const [likes, setLikes] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [changeMessage, setChangeMessage] = useState(null)

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
    console.log("logging in with", username, password)

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
      const returnedBlog = await blogService.create({
        title,
        author,
        url,
        likes,
        user: user.name,
      })

      setBlogs(() => blogs.concat(returnedBlog))
      setTitle("")
      setAuthor("")
      setURL("")

      setChangeMessage(`A new blog ${title} by ${author} added`)

      setTimeout(() => {
        setChangeMessage(null)
      }, 2500)
    } catch (exception) {
      setErrorMessage(
        "There is something wrong with the entries, please fill in all fields correctly."
      )

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

      <CreateBlog
        handleChangeTitle={({ target }) => setTitle(target.value)}
        handleChangeAuthor={({ target }) => setAuthor(target.value)}
        handleChangeURL={({ target }) => setURL(target.value)}
        handleChangeLikes={({ target }) => setLikes(target.value)}
        handleSubmit={handleCreateBlog}
        values={{ title, author, url, likes }}
      />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
