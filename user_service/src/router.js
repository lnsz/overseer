const User = require('./schema')
const router  = require('express').Router()
const passport = require('passport')

// Fetch all user
const getUser = (req, res) => {
  User.findOne({
    username: req.params.username
  }, (error, user) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    res.send(user)
  })
}

// Create a user
const createUser = (req, res) => {
  new User({
    ...req.body
  }).save(error => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    res.send({ success: true })
  })
}

// Update a user
const updateUser = (req, res) => {
  User.findOne({
    username: req.params.username
  }, (error, user) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    Object.keys(req.body).forEach( key => { if (req.body) tile[key] = req.body[key] } )
    user.save(error => {
      if (error) {
        console.log(error)
        res.status(500).send(error)
        return
      }
      res.send({ success: true })
    })
  })
  res.send({ success: true })
}

// Delete a user
const deleteUser = (req, res) => {
  User.remove({
    username: req.params.username
  }, error => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    res.send({ success: true })
  })
}

router
  .get('/users/:username', getUser)
  .post('/users', createUser)
  .put('/users/:username', updateUser)
  .delete('/users/:username', deleteUser)

module.exports = router
