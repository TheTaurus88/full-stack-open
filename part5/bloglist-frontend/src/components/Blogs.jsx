import Blog from "./Blog"

const Blogs = ({ blogs, handleAddLike }) => (
  <div>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} handleAddLike={handleAddLike} />
    )}
  </div>  
)

export default Blogs