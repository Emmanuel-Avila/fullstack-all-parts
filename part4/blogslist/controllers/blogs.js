const blogsRouter = require('express').Router();
const User = require('../models/User.js')
const Blog = require('../models/Blog.js')
const logger = require('../utils/logs.js')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {

  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
    response.status(200).json(blogs);

  } catch (error) {
    logger.error(error);
    response.status(500).json({ error: error.message })
  }
})

blogsRouter.post('/', async (request, response) => {

  console.log("log")
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' });
  }

  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).json({ error: 'Missing properties' })
  }


  try {
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({ ...request.body, user: user.id });

    const res = await blog.save();
    user.blogs = user.blogs.concat(blog._id);
    await user.save();
    response.status(201).json(res);
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  try {
    const blogToDelete = await Blog.findByIdAndDelete(id)
    response.status(200).json(blogToDelete);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const body = request.body;
  if (body.likes === undefined) { return response.status(400).json({ error: 'Missing like properties' }) }

  const blog = {
    ...body
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.status(200).json(updatedBlog);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
})

module.exports = blogsRouter;