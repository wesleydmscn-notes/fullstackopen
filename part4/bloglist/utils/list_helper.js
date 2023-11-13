const lodash = require("lodash")

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  try {
    const result = blogs.reduce((prev, curr) => {
      return prev.likes > curr.likes ? prev : curr
    })

    return {
      title: result.title,
      author: result.author,
      likes: result.likes,
    }
  } catch (error) {
    return {}
  }
}

const mostBlogs = (blogs) => {
  try {
    const target = lodash.maxBy(blogs, (blog) => blog.author)
    const quantity = blogs.filter(
      (blog) => blog.author === target.author
    ).length

    return {
      author: target.author,
      blogs: quantity,
    }
  } catch (error) {
    return {}
  }
}

const mostLikes = (blogs) => {
  try {
    const target = lodash.maxBy(blogs, (blog) => blog.likes)
    const quantity = blogs.reduce((prev, curr) => {
      const condition = curr.author === target.author
      return condition ? curr.likes + prev : prev
    }, 0)

    return {
      author: target.author,
      likes: quantity,
    }
  } catch (error) {
    return {}
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
