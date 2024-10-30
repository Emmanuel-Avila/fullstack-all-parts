const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logs');
const blogsRouter = require('./controllers/blogs');

const { PORT, MONGODB_URI } = require('./utils/config');

mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB: ', error.message)
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})