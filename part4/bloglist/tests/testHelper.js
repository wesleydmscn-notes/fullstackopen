const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "How coding in JavaScript",
    author: "Wesley Damasceno",
    likes: 0,
    url: "https://github.com/wesleydmscn",
  },
]

const nonExistingId = async () => {
  const note = new Blog({ content: "willremovethissoon" })

  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map((note) => note.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
