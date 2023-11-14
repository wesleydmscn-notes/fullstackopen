const mongoose = require("mongoose")
const supertest = require("supertest")

const app = require("../app")

const api = supertest(app)

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

  test("Response have required properties in each object ", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body[0]).toHaveProperty("title")
    expect(response.body[0]).toHaveProperty("author")
    expect(response.body[0]).toHaveProperty("likes")
    expect(response.body[0]).toHaveProperty("url")
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
