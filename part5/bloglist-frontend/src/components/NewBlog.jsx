const NewBlog = ({ title, author, url, setTitle, setAuthor, setUrl, handleSubmitBlog }) => (
  <div>
    <h3>Create new blog</h3>
    <form onSubmit={handleSubmitBlog}>
      <div>
        <label>
          title
          <input type="text" 
          value={title} 
          onChange={({ target }) => setTitle(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          author
          <input type="text"
          value={author} 
          onChange={({ target }) => setAuthor(target.value)}/>
        </label>
      </div>
      <div>
        <label>
          url
          <input type="text"
          value={url} 
          onChange={({ target }) => setUrl(target.value)}/>
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  </div>  
)

export default NewBlog