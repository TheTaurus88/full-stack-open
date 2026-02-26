import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import Login from './components/Login'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
    }

  }
  useEffect(getUserHook, [])

  const handleSubmitLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password})
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch {
      console.log('wrong credentials')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <div>
      {user ? 
      <Blogs 
        blogs={blogs} 
        user={user} 
        handleLogout={handleLogout}/> 
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