const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logs');

const { PORT, MONGODB_URI } = require('./utils/config');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
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

app.post('/api/blogs', (request, response) => {
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

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})