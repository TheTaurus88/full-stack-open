import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import Login from './components/Login'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [color, setColor] = useState('')
  const newBlogRef = useRef()

  const getBlogsHook = () => {
    const getAll = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getAll()
  }
  useEffect(getBlogsHook, [])

  const getUserHook = () => {
    const userString = window.localStorage.getItem('user')
    if (userString) {
      const user = JSON.parse(userString)
      setUser(user)
      blogService.setToken(user.token)
    }

  }
  useEffect(getUserHook, [])

  const handleSubmitLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password})
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch {
      setMessage('Login failed, wrong credentials')
      setColor('red')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleSubmitBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      newBlogRef.current.toggleVisibility()
      setMessage(`Blog created - ${newBlog.title} by ${newBlog.author}`)
      setColor('green')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch {
      setMessage('Error in blog creation')
      setColor('red')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={message} color={color}/>
      {user ? 
      <div>
        <Logout name={user.name} handleLogout={handleLogout}/>
        <Togglable showButtonLabel='create new blog' ref={newBlogRef}>
          <NewBlog handleSubmitBlog={handleSubmitBlog}/>
        </Togglable>
        <Blogs 
          blogs={blogs}/> 
      </div>
      : 
      <Login 
        username={username} 
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleSubmitLogin={handleSubmitLogin}/>
      }
    </div>
  )
}

export default App