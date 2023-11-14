const express = require("express")

require("express-async-errors")

const cors = require("cors")
const mongoose = require("mongoose")

const blogRouter = require("./controllers/blog")
const middleware = require("./utils/middleware")
const config = require("./utils/config")
const logger = require("./utils/logger")

const app = express()

mongoose.set("strictQuery", false)

logger.info("connecting to", config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())
app.use(middleware.requestLogger)

app.use(blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
