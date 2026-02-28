import { useState } from "react"

const Blog = ({ blog }) => {
  const [ isDetailMode, setIsDetailMode ] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideView = () => setIsDetailMode(!isDetailMode)
  
  return (
  <div style={blogStyle}>
    {isDetailMode ? 
      <div>
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button>like</button>
        </p>
        <button onClick={hideView}> hide</button>
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