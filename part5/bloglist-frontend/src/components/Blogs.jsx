import Blog from './Blog'

const Blogs = ({ blogs, handleAddLike, user, handleDeleteBlog }) => (
  <div>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        handleAddLike={handleAddLike}
        user={user}
        handleDeleteBlog={handleDeleteBlog}/>
    )}
  </div>
)

export default Blogs