import { useState } from 'react'

const NewBlog = ({ handleSubmitBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    await handleSubmitBlog({ 'title': title, 'author': author, 'url': url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={addBlog}>
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
  )}

export default NewBlog