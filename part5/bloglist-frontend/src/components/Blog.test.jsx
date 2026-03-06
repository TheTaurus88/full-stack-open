import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title, author but not URL', () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    url: 'blog url'
  }

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