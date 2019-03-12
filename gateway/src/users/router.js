const router  = require('express').Router()
const axios = require('axios')
const passport = require('passport')
const userService = `http://${process.env.USER_SERVICE_IP}:${process.env.USER_SERVICE_HP}`

// Fetch user
const getUser = (req, res) => {
  console.log(req.isAuthenticated())
  axios.get(`${userService}${req.originalUrl}`)
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error.response.data)
    })
}

// Create a user
const createUser = (req, res) => {
  axios.post(`${userService}${req.originalUrl}`, req.body)
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error.response.data)
    })
}

// Update a user
const updateUser = (req, res) => {
  axios.put(`${userService}${req.originalUrl}`, req.body)
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error.response.data)
    })
}

// Delete a user
const deleteUser = (req, res) => {
  axios.delete(`${userService}${req.originalUrl}`)
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send(error.response.data)
    })
}


router
  .get('/users/:username', getUser)
  .post('/users', createUser)
  .put('/users/:username', updateUser)
  .delete('/users/:username', deleteUser)

module.exports = router
