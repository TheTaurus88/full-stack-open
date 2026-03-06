import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'

test('new blog test', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()

  const title = 'input title'
  const author = 'input author'
  const url = 'input url'

  render(<NewBlog handleSubmitBlog={mockHandler} />)
  const inputTitle = screen.getByLabelText('title')
  const inputAuthor = screen.getByLabelText('author')
  const inputUrl = screen.getByLabelText('url')
  const createButton = screen.getByText('create')

  await user.type(inputTitle, title)
  await user.type(inputAuthor, author)
  await user.type(inputUrl, url)
  await user.click(createButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe(title)
  expect(mockHandler.mock.calls[0][0].author).toBe(author)
  expect(mockHandler.mock.calls[0][0].url).toBe(url)
})