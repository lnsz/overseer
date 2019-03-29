const router  = require('express').Router()
const axios = require('axios')

const getStatus = (req, res) => {
  res.send({ user: req.user, isAuthenticated: req.isAuthenticated() })
}

// Fetch user
const getUser = (req, res) => {
  axios.get(`${process.env.USER_SERVICE_URL}${req.originalUrl}`)
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      console.log(error)
      res.send({ error: error.response.data })
    })
}

// Create a user
const createUser = (req, res) => {
  axios.post(`${process.env.USER_SERVICE_URL}${req.originalUrl}`, req.body)
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      console.log(error.response)
      res.send({ error: error.response.data })
    })
}

// Update a user
const updateUser = (req, res) => {
  axios.put(`${process.env.USER_SERVICE_URL}${req.originalUrl}`, req.body)
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      console.log(error)
      res.send({ error: error.response.data })
    })
}

// Delete a user
const deleteUser = (req, res) => {
  axios.delete(`${process.env.USER_SERVICE_URL}${req.originalUrl}`)
    .then(response => {
      res.send(response.data)
    })
    .catch(error => {
      console.log(error)
      res.send({ error: error.response.data })
    })
}


router
  .get('/users', getStatus)
  .get('/users/:username', getUser)
  .post('/users', createUser)
  .put('/users/:username', updateUser)
  .delete('/users/:username', deleteUser)

module.exports = router
