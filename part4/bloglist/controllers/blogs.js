const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  body['likes'] = body['likes'] || 0

  const blog = new Blog(body)
  const insertBlog = await blog.save()
  response.status(201).json(insertBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  if (blog) {
    const body = request.body
    // blog.title = body.title
    // blog.author = body.author
    // blog.url = body.url
    blog.likes = body.likes
    const insertBlog = await blog.save()
    response.json(insertBlog)
  } else {
    return response.status(404).end()
  }
})

module.exports = blogsRouter