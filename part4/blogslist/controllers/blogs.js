const blogsRouter = require('express').Router();
const Blog = require('../models/Blog.js')
const logger = require('../utils/logs.js')

blogsRouter.get('/', async (request, response) => {

  try {
    const blogs = await Blog.find({});
    response.status(200).json(blogs);

  } catch (error) {
    logger.error(error);
    response.status(500).json({ error: error.message })
  }
})

blogsRouter.post('/', async (request, response) => {
  if (request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).json({ error: 'Missing properties' })
  }
  const blog = new Blog(request.body);
  try {
    const res = await blog.save();
    response.status(201).json(res);

  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

blogsRouter.delete('/:id', async (request, response) => {

  const { id } = request.params;
  try {
    const blogTo = await Blog.findByIdAndDelete(id)
    response.status(200).json(blogTo);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
})

module.exports = blogsRouter;