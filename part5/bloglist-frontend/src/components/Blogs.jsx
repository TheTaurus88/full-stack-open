import Blog from "./Blog"

const Blogs = ({ blogs, user }) => (
  <div>
    <h2>Welcome {user.name}</h2>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>  
)

export default Blogs