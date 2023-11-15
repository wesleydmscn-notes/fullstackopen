const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/api/blogs", async (request, response) => {
  const blogResponse = await Blog.find({})
  response.json(blogResponse)
})

blogRouter.get("/api/blogs/:id", async (request, response) => {
  const { id } = request.params
  const blogResponse = await Blog.findOne({ _id: id })
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

blogRouter.delete("/api/blogs/:id", async (request, response) => {
  const { id } = request.params
  await Blog.findByIdAndDelete(id)
  response.status(202).end()
})

module.exports = blogRouter
