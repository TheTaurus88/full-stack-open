import { useState } from "react"

const Blog = ({ blog, handleAddLike, user, handleDeleteBlog }) => {
  const [ isDetailMode, setIsDetailMode ] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideView = () => { setIsDetailMode(!isDetailMode) }
  const addLike = async () => { await handleAddLike(blog) }
  const removeBlog = async () => { 
    if (window.confirm('Remove blog?')) {
      await handleDeleteBlog(blog)
    }
  }
  const blogUserIsLoggedUser = blog?.user?.username === user?.username

  return (
  <div style={blogStyle}>
    {isDetailMode ? 
      <div>
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>{blog?.user?.username}</p>
        <p>
          likes {blog.likes}
          <button onClick={addLike}>like</button>
        </p>
        <button onClick={hideView}> hide</button>
        <div>
          {blogUserIsLoggedUser ?
            <button onClick={removeBlog}> remove</button>
            : <></>
          }
        </div>
      </div>
      :
      <div>
        {blog.title} {blog.author}
        <button onClick={hideView}> view</button>
      </div>
    }
  </div>  
)}

export default Blog