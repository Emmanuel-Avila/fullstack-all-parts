const usersRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response, next) => {
  try {

    const users = await User.find({})

    response.status(200).json(users);
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;
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