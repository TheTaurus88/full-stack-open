import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'blog title',
  author: 'blog author',
  url: 'blog url',
  likes: 0
}

test('detail off: renders title/author but not url/likes', () => {

  render(<Blog blog={blog} />)

  // Exact string found
  expect(screen.getByText('blog title blog author')).toBeInTheDocument()

  // Regex (string contained in html) found
  expect(screen.queryByText(/blog title/)).toBeInTheDocument()
  expect(screen.queryByText(/blog author/)).toBeInTheDocument()

  // Exact string not found
  expect(screen.queryByText('blog')).not.toBeInTheDocument()

  // Regex not found
  expect(screen.queryByText(/url/)).not.toBeInTheDocument()
  expect(screen.queryByText(/likes/)).not.toBeInTheDocument()
})

test('detail on: renders title/author/url/likes', async () => {

  render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  screen.debug()
  expect(screen.queryByText(/blog title/)).toBeInTheDocument()
  expect(screen.queryByText(/blog author/)).toBeInTheDocument()
  expect(screen.queryByText(/blog url/)).toBeInTheDocument()
  expect(screen.queryByText(/likes 0/)).toBeInTheDocument()
})