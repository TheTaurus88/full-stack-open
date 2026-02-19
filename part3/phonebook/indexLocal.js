const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

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

const PORT=3001
let persons = [
  {
    'id': '1',
    'name': 'Arto Hellas',
    'number': '040-123456'
  },
  {
    'id': '2',
    'name': 'Ada Lovelace',
    'number': '39-44-5323523'
  },
  {
    'id': '3',
    'name': 'Dan Abramov',
    'number': '12-43-234345'
  },
  {
    'id': '4',
    'name': 'Mary Poppendieck',
    'number': '39-23-6423122'
  }
]

const error400 = (response, message) => {
  return response.status(400).json({ error: message })
}

app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.get('/info', (request, response) => {
  const date = new Date()
  response.send(
    `<p>Phonebook has ${persons.length} persons</p>
     <p>${date}</p>`
  )
})
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  console.log('id',id)
  console.log('persons', persons)
  if (person) {
    persons = persons.filter(person => person.id !== id)
    response.send(person)
  } else {
    response.status(404).end()
  }
})
app.post('/api/persons', (request, response) => {
  const newPerson = request.body
  if (!newPerson.name) {
    return error400(response, 'Missing name field')
  } else if (!newPerson.number) {
    return error400(response, 'Missing number field')
  } else if (persons.find(person => person.name === newPerson.name)) {
    return error400(response, 'Name already present')
  }
  newPerson['id'] = Math.round(Math.random()*1000000).toString()
  persons = persons.concat(newPerson)
  response.send(newPerson)
})
app.listen(PORT, () => {console.log('listen port', PORT)})