const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (prev, curr) => prev + curr['likes']
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog['likes']))
  return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  const reducer = (prevArray, currBlog) => {
    const newArray = prevArray.filter(obj => obj.author !== currBlog.author)
    const authorObj = prevArray.find(obj => obj.author === currBlog.author)
    if (authorObj) {
      newArray.push({ 'author': currBlog.author, 'num': authorObj.num + 1 })
    } else {
      newArray.push({ 'author': currBlog.author, 'num': 1 })
    }
    return newArray
  }
  // [ { author: "a", num: 3}, { author: "b", num: 2} ]
  const authNumMap = blogs.reduce(reducer, [])
  return authNumMap.toSorted((a, b) => b.num - a.num)[0]
}

const mostLikes = (blogs) => {
  const reducer = (prevArray, currBlog) => {
    const newArray = prevArray.filter(obj => obj.author !== currBlog.author)
    const authorObj = prevArray.find(obj => obj.author === currBlog.author)
    if (authorObj) {
      newArray.push({ 'author': currBlog.author, 'likes': authorObj.likes + currBlog.likes })
    } else {
      newArray.push({ 'author': currBlog.author, 'likes': currBlog.likes })
    }
    return newArray
  }
  // [ { author: "a", likes: 13}, { author: "b", likes: 20} ]
  const authLikesMap = blogs.reduce(reducer, [])
  return authLikesMap.toSorted((a, b) => b.likes - a.likes)[0]
}

const exported = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
module.exports = exported