const router  = require('express').Router()
const axios = require('axios')
const userService = `http://${process.env.USER_SERVICE_IP}:${process.env.USER_SERVICE_HP}`

// Fetch user
const fetchUser = (req, res) => {
  axios.get(`${userService}${req.originalUrl}`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
}

// Create a user
const createUser = (req, res) => {
  axios.post(`${userService}${req.originalUrl}`, req.body)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
}

// Update a user
const updateUser = (req, res) => {
  axios.put(`${userService}${req.originalUrl}`, req.body)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
}

// Delete a user
const deleteUser = (req, res) => {
  axios.delete(`${userService}${req.originalUrl}`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
    })
}

router
  .get('/users/:user_id', fetchUser)
  .post('/users', createUser)
  .put('/users/:user_id', updateUser)
  .delete('/users/:user_id', deleteUser)

module.exports = router
