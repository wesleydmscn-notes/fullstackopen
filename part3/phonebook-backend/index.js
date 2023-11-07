const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

require("dotenv").config()

const app = express()

const Person = require("./models/person")

morgan.token("body", function getBody(req) {
  if (req.body && req.body.name && req.body.number) {
    return JSON.stringify(req.body)
  }

  return " "
})

app.use(cors())
app.use(express.json())
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
)

app.use(express.static("dist"))

app.get("/", (req, res) => res.send("Hello World!"))

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => {
    res.json(result)
  })
})

app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params
  Person.findById(id)
    .then((person) => res.json(person))
    .catch((_error) => {
      res.status(404).json({ message: "This person not exists in database" })
    })
})

app.get("/info", (req, res) => {
  const html = `
  <p>Phonebook has info for ${phonebook.length} people</p>
  <p>${new Date()}</p>
  `

  res.send(html)
})

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body

  if (!name) return res.status(400).json({ error: "'name' key is missing" })
  if (!number) return res.status(400).json({ error: "'number' key is missing" })

  const newPerson = new Person({
    name,
    number
  })

  newPerson.save().then((savedPerson) => {
    res.status(201).json(savedPerson)
  })
})

app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params
  const target = phonebook.find((person) => person.id === Number(id))

  if (target) {
    phonebook = phonebook.filter((person) => person.id !== Number(id))
    return res.status(204).end()
  }

  return res.status(404).end()
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log("Server is running at port", PORT)
})
