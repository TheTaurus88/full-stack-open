const bcrypt = require('bcrypt')
const User = require('../models/user')
const { test, describe, beforeEach, after } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'root', passwordHash })

    await user.save()
  })

  test('login succeeds', async () => {
    const newUser = {
      username: 'root',
      password: 'sekret',
    }

    await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('login fails, wrong password', async () => {
    const newUser = {
      username: 'root',
      password: 'sekretssssss',
    }

    await api
      .post('/api/login')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('login fails, wrong username', async () => {
    const newUser = {
      username: 'root2',
      password: 'sekret',
    }

    await api
      .post('/api/login')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})