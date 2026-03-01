const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  // authentication
  // const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }
  // const user = await User.findById(decodedToken.id)
  // if(!user) return response.status(400).json({ error: 'User not found or invalid' })

  let user = request.user
  body['likes'] = body['likes'] || 0
  body['user'] = user._id

  const blog = new Blog(body)
  const insertBlog = await blog.save()

  user.blogs = user.blogs.concat(blog._id)
  await user.save()
  response.status(201).json(insertBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }
  // const user = await User.findById(decodedToken.id)
  // if(!user) return response.status(400).json({ error: 'User not found or invalid' })
  let user = request.user

  const blog = await Blog.findById(id)
  if ( blog.user.toString() === user._id.toString() ) {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'User is not authorized to delete this blog' })
  }
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
    await insertBlog.populate('user', { username: 1, name: 1 })
    response.json(insertBlog)
  } else {
    return response.status(404).end()
  }
})

module.exports = blogsRouter