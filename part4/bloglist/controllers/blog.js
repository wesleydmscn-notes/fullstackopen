const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/api/blogs", async (request, response) => {
  const blogResponse = await Blog.find({})
  response.json(blogResponse)
})

blogRouter.post("/api/blogs", async (request, response) => {
  const { title, author, likes, url } = request.body

  if (!title || !author || !url) {
    return response.status(400).end()
  }

  const blog = new Blog({ title, author, url, likes: likes || 0 })
  const blogResponse = await blog.save()

  response.status(201).json(blogResponse)
})

module.exports = blogRouter
