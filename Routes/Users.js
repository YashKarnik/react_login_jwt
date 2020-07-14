const Router = require('express').Router()
const User = require('../Models/user.models')
const bcrypt = require('bcryptjs')
const auth = require('../Middleware/AuthMiddleware')
const jwt = require('jsonwebtoken')
Router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`ERROR!!! ${err}`))
})

Router.route('/find').get(auth, (req, res) => {
  User.findById(res.userA.id)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`ERROR!!! ${err}`))
})
Router.route('/delete').delete(auth, (req, res) => {
  User.findByIdAndDelete(res.userA.id)
    .then((usr) => res.json(`User with _id ${usr.username} deleted!!`))
    .catch((err) => res.status(400).json(`ERROR!!! ${err}`))
})

Router.route('/add').post((req, res) => {
  const { username, email, password } = req.body
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      const newUser = new User({ username, email, password: hash })
      newUser
        .save()
        .then(() =>
          jwt.sign(
            { id: newUser._id },
            process.env.JWT_ACCESS_KEY_1,
            (err, token) => {
              if (err) throw err
              res.json({ token, user: { ...newUser } })
              localStorage.setItem('token', token)
            }
          )
        )
        .catch((err) => res.status(400).json(`ERROR!!! ${err}`))
    })
  })
})

module.exports = Router
