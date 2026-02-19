const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const dns = require('node:dns/promises')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
dns.setServers(['1.1.1.1'])

const app = express()

app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { family: 4 })

module.exports = app