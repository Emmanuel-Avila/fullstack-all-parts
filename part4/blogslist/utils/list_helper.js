const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((acc, blog) => acc + blog.likes, 0)
  return total;
}

const favoriteBlog = (blogs) => {

  if (blogs.length === 0) return {};

  return blogs.reduce((mostLikedBlog, blog) => {
    return blog.likes > mostLikedBlog.likes ?
      { author: blog.author, likes: blog.likes, title: blog.title } :
      mostLikedBlog
  },
    { likes: 0 })
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) return {}

  let authorsBlogsHash = {};
  let mostAuthorBlogs = { author: '', blogs: 0 };

  blogs.forEach((blog) => {
    if (!authorsBlogsHash[blog.author]) {
      authorsBlogsHash[blog.author] = 1;
    } else {
      authorsBlogsHash[blog.author]++;
    }
  })

  for (const [author, writtenBlogs] of Object.entries(authorsBlogsHash)) {
    if (writtenBlogs > mostAuthorBlogs['blogs']) {
      mostAuthorBlogs['blogs'] = writtenBlogs;
      mostAuthorBlogs['author'] = author;
    }
  }

  return mostAuthorBlogs;
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }