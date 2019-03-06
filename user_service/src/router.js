const User = require('./schema')
const router  = require('express').Router()

// Fetch all user
const fetchUser = (req, res) => {
  res.send({ success: true })
}

// Create a user
const createUser = (req, res) => {
  res.send({ success: true })
}

// Update a user
const updateUser = (req, res) => {
  res.send({ success: true })
}

// Delete a user
const deleteUser = (req, res) => {
  res.send({ success: true })
}

router
  .get('/user/:user_id', fetchUser)
  .post('/users', createUser)
  .put('/users/:user_id', updateUser)
  .delete('/users/:user_id', deleteUser)

module.exports = router
