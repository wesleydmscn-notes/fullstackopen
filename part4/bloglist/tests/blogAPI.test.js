const mongoose = require("mongoose")
const supertest = require("supertest")
const bcrypt = require("bcrypt")

const app = require("../app")

const Blog = require("../models/blog")
const User = require("../models/user")

const helper = require("./testHelper")

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash("12345", 10)
  const user = new User({
    username: "wesleydmscn",
    name: "Wesley Damasceno",
    blogs: [],
    passwordHash,
  })

  await user.save()
}, 5000)

beforeEach(async () => {
  await Blog.deleteMany({})

  const users = await User.find({})
  const user = users[0]

  const blogObjects = helper.initialBlogs.map(
    (blog) =>
      new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        user: user._id,
        likes: blog.likes ? blog.likes : 0,
      })
  )

  const arrayOfPromise = blogObjects.map((blog) => {
    blog.save()
    user.blogs = user.blogs.concat(blog._id)
  })

  await Promise.all(arrayOfPromise)
  await user.save()
}, 5000)

describe("GET - Returns amount of blog posts", () => {
  test("Response have length equal one and status code 200", async () => {
    const response = await api.get("/api/blogs")
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(2)
  })

  test("Response have a id property defined", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const response = await api.get(`/api/blogs/${blogsAtStart[0].id}`)

    expect(response.body.id).toBeDefined()
  })
})

describe("POST - Successfully creates a new blog post", () => {
  test("Verify that total number of blogs is increased by one and the content is saved correctly", async () => {
    const newBlog = {
      title: "Another blog post",
      author: "Wesley Damasceno",
      likes: 0,
      url: "https://github.com/wesleydmscn",
    }

    const loginUser = await api
      .post("/api/login")
      .send({ username: "wesleydmscn", password: "12345" })

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${loginUser.body.token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

    expect(response.body[2].title).toBe("Another blog post")
    expect(response.body[2].author).toBe("Wesley Damasceno")
    expect(response.body[2].likes).toBe(0)
    expect(response.body[2].url).toBe("https://github.com/wesleydmscn")
  })

  test("Verifies that if the likes property is missing from the request", async () => {
    const newBlog = {
      title: "TypeScript I need you",
      author: "Wesley Damasceno",
      url: "https://github.com/wesleydmscn",
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/)
  })

  test("Verifies that if the title property is missing from the request", async () => {
    const newBlog = {
      author: "Wesley Damasceno",
      url: "https://github.com/wesleydmscn",
      likes: 2,
    }

    await api.post("/api/blogs").send(newBlog).expect(400)
  })

  test("Verifies that if the url property is missing from the request", async () => {
    const newBlog = {
      title: "Python I need you",
      author: "Wesley Damasceno",
      likes: 1,
    }

    await api.post("/api/blogs").send(newBlog).expect(400)
  })
})

describe("DELETE - Successfully delete a blog post", () => {
  test("Delete blog post by id", async () => {
    const loginUser = await api
      .post("/api/login")
      .send({ username: "wesleydmscn", password: "12345" })

    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${blogsAtStart[0].id}`)
      .set("Authorization", `Bearer ${loginUser.body.token}`)
      .expect(202)
  })
})

describe("PUT - Successfully update a blog post", () => {
  test("Update blog post by id", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const fieldsToUpdate = {
      title: "Hello World!",
      likes: 2,
    }

    await api
      .put(`/api/blogs/${blogsAtStart[1].id}`)
      .send(fieldsToUpdate)
      .expect(204)
  })
})

describe("POST in /api/users", () => {
  test("Check that a user was not created with an invalid username", async () => {
    const invalidFields = {
      username: "we",
      password: "12345",
      name: "Wesley Damasceno",
    }

    const response = await api
      .post("/api/users")
      .send(invalidFields)
      .expect(400)

    expect(response.body).toEqual({
      error: "password or username must be at least 3 characters long",
    })
  })

  test("Check that a user was not created with invalid fields", async () => {
    const response = await api.post("/api/users").send({}).expect(400)
    expect(response.body).toEqual({
      error: "password and username must be given",
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
