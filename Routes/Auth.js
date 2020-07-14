const Router = require('express').Router()
const User = require('../Models/user.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../Middleware/AuthMiddleware')
Router.route('/').post((req, res) => {
  const { email, password } = req.body
  User.findOne({ email })
    .then((user) => {
      if (!user) res.status(400).json({ message: 'User dosent exist' })
      bcrypt.compare(password, user.password, (err, response) => {
        if (!response) res.status(400).json({ message: 'Invalid Creds' })
        else {
          jwt.sign(
            { id: user._id },
            process.env.JWT_ACCESS_KEY_1,
            (err, token) => {
              if (err) throw err
              res.json({ token, user })
            }
          )
        }
      })
    })
    .catch((err) => console.log('error' + err))
})

module.exports = Router
