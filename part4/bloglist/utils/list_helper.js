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
      likes: result.likes
    }
  } catch (error) {
    return {}
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
