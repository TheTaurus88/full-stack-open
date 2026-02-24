const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: '1',
  },
  {
    title: 'title2',
    author: 'author2',
    url: 'url2',
    likes: '2',
  },
]

const getId = async (existent) => {
  if (existent) {
    const blogs = await Blog.find({})
    return blogs[0].id
  } else {
    const newBlog = new Blog({ title: 'titleNew', url: 'urlNew' })
    await newBlog.save()
    const id = newBlog._id.toString()
    await Blog.findByIdAndDelete(id)
    return id
  }
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  // 1 -- one by one
  // let noteObject = new Blog(initialBlogs[0])
  // await noteObject.save()
  // noteObject = new Blog(initialBlogs[1])
  // await noteObject.save()
  // 2 -- Promise array and Promise.all
  // const blogs = initialBlogs.map(blog => new Blog(blog))
  // const promiseArray = blogs.map(blog => blog.save())
  // await Promise.all(promiseArray)
  // 3 -- for loop
  // for (let blog of initialBlogs) {
  //   let blogObject = new Blog(blog)
  //   await blogObject.save()
  // }
  // 4 -- appropriate method
  await Blog.insertMany(initialBlogs)

  // const passwordHash = await bcrypt.hash('sekret', 10)
  // const user = new User({ username: 'root', name: 'root', passwordHash })
  await api
    .post('/api/users')
    .send({ username: 'root', name: 'root', password: 'sekret' })

  // await user.save()
})

test('get blogs return status 200 type json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('get blogs number', async () => {
  const blogs = await api.get('/api/blogs')
  assert.strictEqual(blogs.body.length, initialBlogs.length)
})

test('blogs contain id field', async () => {
  const blogs = await api.get('/api/blogs')
  const firstBlog = blogs.body[0]
  assert.strictEqual(firstBlog['id'] !== undefined, true)
})

test('insert blog', async () => {
  const newBlog =
    {
      title: 'titleNew',
      author: 'authorNew',
      url: 'urlNew',
      likes: 99
    }
  const loginRes = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${loginRes.body.token}`)
    .send(newBlog)
  const blogs = await api.get('/api/blogs')
  const returnedBlogs = blogs.body
  assert.strictEqual(returnedBlogs.length, initialBlogs.length + 1)

  const insertedBlog = returnedBlogs.filter(blog => blog['title'] === 'titleNew')[0]
  delete insertedBlog['id']
  delete insertedBlog['user']
  assert.deepStrictEqual(newBlog, insertedBlog)
})

test('insert blog', async () => {
  const newBlog =
    {
      title: 'titleNew',
      author: 'authorNew',
      url: 'urlNew',
      likes: 99
    }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('insert blog default likes 0', async () => {
  const newBlog =
    {
      title: 'titleNew',
      author: 'authorNew',
      url: 'urlNew',
    }
  const loginRes = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${loginRes.body.token}`)
    .send(newBlog)
  const blogs = await api.get('/api/blogs')
  const returnedBlogs = blogs.body

  const insertedBlog = returnedBlogs.filter(blog => blog['title'] === 'titleNew')[0]
  delete insertedBlog['id']
  delete insertedBlog['user']
  newBlog['likes'] = 0
  assert.deepStrictEqual(newBlog, insertedBlog)
})

test('insert blog no title', async () => {
  const newBlog =
    {
      author: 'authorNew',
      url: 'urlNew',
    }
  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY5OWRkNDRjNThkNzNjMWM4NzY1NDdmNyIsImlhdCI6MTc3MTk1MTMzM30.suyr9Xmt34sgi79jtImTq3kV9k-tPgy1EBzkD2lH9XM')
    .send(newBlog)
    .expect(400)
})

test('insert blog no url', async () => {
  const newBlog =
    {
      title: 'titleNew',
      author: 'authorNew',
    }
  await api
    .post('/api/blogs')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY5OWRkNDRjNThkNzNjMWM4NzY1NDdmNyIsImlhdCI6MTc3MTk1MTMzM30.suyr9Xmt34sgi79jtImTq3kV9k-tPgy1EBzkD2lH9XM')
    .send(newBlog)
    .expect(400)
})

test('delete existing blog', async () => {
  const newBlog =
    {
      title: 'titleNew',
      author: 'authorNew',
      url: 'urlNew',
      likes: 99
    }
  const loginRes = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })
  const blogRes = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${loginRes.body.token}`)
    .send(newBlog)
  // const existingId = await getId(true) -- user must be logged in, in order to delete
  await api
    .delete(`/api/blogs/${blogRes.body.id}`)
    .set('Authorization', `Bearer ${loginRes.body.token}`)
    .expect(204)

  const blogs = await api.get('/api/blogs')
  assert.strictEqual(blogs.body.length, initialBlogs.length)
  assert.deepStrictEqual(blogs.body.filter(blog => blog.id === loginRes.body.token), [])
})

test('delete unauthorized', async () => {
  const nonExistingId = await getId(false)
  await api.delete(`/api/blogs/${nonExistingId}`).expect(401)

  const blogs = await api.get('/api/blogs')
  assert.strictEqual(blogs.body.length, initialBlogs.length)
})

test('update existing blog', async () => {
  const existingId = await getId(true)
  const originalBlogs = await api.get('/api/blogs')
  const blogToChange = originalBlogs.body.find(blog => blog.id === existingId)
  const blogChanged = { ...blogToChange, likes: blogToChange.likes + 100 }
  await api.put(`/api/blogs/${existingId}`).send(blogChanged)
  const newBlogs = await api.get('/api/blogs')
  assert.strictEqual(newBlogs.body.find(blog => blog.id === existingId).likes, blogToChange.likes + 100)
})

test('update non existing blog', async () => {
  const nonExistingId = await getId(false)
  await api.put(`/api/blogs/${nonExistingId}`).send({}).expect(404)
})

after(async () => {
  await mongoose.connection.close()
})