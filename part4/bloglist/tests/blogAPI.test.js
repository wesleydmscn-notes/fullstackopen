const mongoose = require("mongoose")
const supertest = require("supertest")

const app = require("../app")
const Blog = require("../models/blog")
const helper = require("./testHelper")

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const newBlog = new Blog(helper.initialBlogs[0])

  await newBlog.save()
})

describe("GET - Returns amount of blog posts", () => {
  test("Response have length equal one and status code 200", async () => {
    const response = await api.get("/api/blogs")
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(1)
  })

  test("Response have a id property defined", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const response = await api.get(`/api/blogs/${blogsAtStart[0].id}`)

    expect(response.body).toBeDefined()
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

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

    expect(response.body[1].title).toBe("Another blog post")
    expect(response.body[1].author).toBe("Wesley Damasceno")
    expect(response.body[1].likes).toBe(0)
    expect(response.body[1].url).toBe("https://github.com/wesleydmscn")
  })

  test("Verifies that if the likes property is missing from the request", async () => {
    const newBlog = {
      title: "TypeScript I need you",
      author: "Wesley Damasceno",
      url: "https://github.com/wesleydmscn",
    }

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    console.log((await api.get("/api/blogs")).body)

    expect(response.body.likes).toBeDefined()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
