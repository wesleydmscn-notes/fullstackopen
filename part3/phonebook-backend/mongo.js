const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://wesleydmscn:${password}@fullstackopen.3fwog3w.mongodb.net/?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model("Person", personSchema)

if (process.argv[3] && process.argv[4]) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then((_result) => {
    console.log(
      `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    )

    mongoose.connection.close()
  })
} else {
  Person.find({}).then((result) => {
    console.log("phonebook:")

    result.forEach((person) => console.log(person))
    mongoose.connection.close()
  })
}
