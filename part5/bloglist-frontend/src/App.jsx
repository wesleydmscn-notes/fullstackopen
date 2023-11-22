import { useState, useEffect } from "react"

import Blog from "./components/Blog"
import Login from "./components/Login"

import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedBlogappUser")

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
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

      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log("Wrong credentials")
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
      />
    )
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedBlogappUser")
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
