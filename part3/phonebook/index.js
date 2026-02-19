require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./mongoosePerson')

const app = express()
app.use(express.json())
app.use(cors())

morgan.token('body', function (req) {
  const body = req.body
  return body ? '- body ' + JSON.stringify(body) : ''
})

const morg = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    '- status', tokens.status(req, res),
    '- content-length', tokens.res(req, res, 'content-length'),
    '-', tokens['response-time'](req, res), 'ms',
    tokens['body'](req, res),
  ].join(' ')
})
app.use(morg)

const PORT = process.env.PORT

const error400 = (response, message) => {
  return response.status(400).json({ error: message })
}

app.get('/api/persons', (request, response) => {
  Person.find().then(data => {
    response.json(data)
  })
})
app.get('/info', (request, response) => {
  Person.find().then(data => {
    const date = new Date()
    const numPersons = data.length
    response.send(
      `<p>Phonebook has ${numPersons} persons</p>
      <p>${date}</p>`
    )
  })
})
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then(found => {
    if (!found) {
      response.status(404).end()
    }
    response.json(found)
  }).catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id).then(deleteResp => {
    response.status(200).send(deleteResp)
  }).catch(error => {
    next(error)
  })
})
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body) {
    return error400(response, 'Missing body')
  } else if (!body.name) {
    return error400(response, 'Missing name field')
  } else if (!body.number) {
    return error400(response, 'Missing number field')
  }

  const newPerson = new Person({
    'name': body.name,
    'number': body.number,
  })

  newPerson.save().then(pers => {
    response.json(pers)
  }).catch(error => next(error))
})
app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  if (!body) {
    return error400(response, 'Missing body')
  } else if (!body.name) {
    return error400(response, 'Missing name field')
  } else if (!body.number) {
    return error400(response, 'Missing number field')
  }

  Person.findById(id).then(found => {
    if (!found) {
      response.status(404).end()
    }
    found.number=body.number
    found.save().then(saveResp => {
      response.send(saveResp)
    })
  }).catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error('error message', error.message)

  if (error.name === 'CastError') {
    console.log('CastError catched')
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

app.listen(PORT, () => {console.log('listen port', PORT)})