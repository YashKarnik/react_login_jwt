require('dotenv').config()
const jwt = require('jsonwebtoken')
function AuthenticateMiddleware(req, res, next) {
  token = req.header('x-auth-token')
  if (!token) res.status(401).json({ msg: 'Unauthorized user' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY_1)
    res.userA = decoded
    next()
  } catch (e) {
    res.status(400).json({ msg: 'Bad Request' })
  }
}

module.exports = AuthenticateMiddleware
