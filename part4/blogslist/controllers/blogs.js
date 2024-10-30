const blogsRouter = require('express').Router();
const Blog = require('../models/Blog.js')
const logger = require('../utils/logs.js')

blogsRouter.get('/', (request, response) => {
  try {
    Blog
      .find({})
      .then(blogs => {
        response.status(200).json(blogs)
      })
  } catch (error) {
    logger.error(error);
    response.status(500).json({ error: error.message })
  }
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  try {
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })

  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

module.exports = blogsRouter;