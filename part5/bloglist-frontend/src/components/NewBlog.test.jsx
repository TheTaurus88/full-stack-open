import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'

test('new blog test', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(<NewBlog handleSubmitBlog={mockHandler} />)
  const inputTitle = screen.getByLabelText('title')
  const inputAuthor = screen.getByLabelText('author')
  const inputUrl = screen.getByLabelText('url')
  const createButton = screen.getByText('create')

  await user.type(inputTitle, 'input title')
  await user.type(inputAuthor, 'input author')
  await user.type(inputUrl, 'input url')
  await user.click(createButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('input title')
  expect(mockHandler.mock.calls[0][0].author).toBe('input author')
  expect(mockHandler.mock.calls[0][0].url).toBe('input url')
})