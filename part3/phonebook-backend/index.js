const express = require("express")
const app = express()

const { phonebook } = require("./db")

app.use(express.json())

app.get("/", (req, res) => res.send("Hello World!"))

app.get("/api/persons", (req, res) => {
  res.json(phonebook)
})

app.get("/info", (req, res) => {
  const html = `
  <p>Phonebook has info for ${phonebook.length} people</p>
  <p>${new Date()}</p>
  `

  res.send(html)
})

app.listen(3001, () => {
  console.log("Server is running at port", 3001)
})
