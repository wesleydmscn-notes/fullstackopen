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
    const response = await api.get("/api/blogs")
    expect(response.body[0].id).toBeDefined()
  })

  test("Response have required properties in each object", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body[0]).toHaveProperty("title")
    expect(response.body[0]).toHaveProperty("author")
    expect(response.body[0]).toHaveProperty("likes")
    expect(response.body[0]).toHaveProperty("url")
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
})

afterAll(async () => {
  await mongoose.connection.close()
})
