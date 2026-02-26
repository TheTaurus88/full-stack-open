import Blog from "./Blog"

const Blogs = ({ blogs, user, handleLogout }) => (
  <div>
    <h2>Welcome {user.name}</h2>
    <button onClick={handleLogout}>logout</button>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>  
)

export default Blogs