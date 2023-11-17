const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.post("/api/users", async (request, response) => {
  const { username, password, name } = request.body
  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get("/api/users", async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = usersRouter
