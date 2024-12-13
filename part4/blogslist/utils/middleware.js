const jwt = require('jsonwebtoken')
const User = require('../models/User');

const getJWTToken = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer')) {
    request.token = authorization.replace('Bearer ', '');
    next();
  }

  return null;
}

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken) {
      return response.status(401).json({ error: 'token invalid' });
    }

    const user = await User.findById(decodedToken.id);
    request.user = user;
    next();
  } catch (error) {
    next(error);
  }

}

module.exports = { getJWTToken, userExtractor }