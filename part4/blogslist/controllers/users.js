const usersRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response, next) => {
  try {

    const users = await User.find({}, 'username name id').populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
    response.status(200).json(users);
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;
    if (!body.username || !body.password) {
      return response.status(400).json({ error: 'Missing username or password' });
    }

    if (body.username.length <= 3 || body.password.length <= 3) {
      return response.status(400).json({ error: 'Username or password of insufficient length' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const newUser = new User({
      username: body.username,
      passwordHash,
      name: body.name
    });

    const savedUser = await newUser.save()

    response.status(201).json(savedUser);
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter;