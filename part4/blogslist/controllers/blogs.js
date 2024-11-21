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
  const blog = new Blog(request.body);
  try {
    const res = await blog.save();
    response.status(201).json(res);

  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

module.exports = blogsRouter;