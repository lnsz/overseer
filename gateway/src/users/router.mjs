import express from 'express'
import axios from 'axios'

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

const login = (passport) => {
  return (req, res, next) => {
    passport.authenticate('local', function(err, user) {
      if (err) { return res.send({ success: false, message: err }) }
      if (!user) { return res.send({ success: false, error: "Incorrect username or password"}) }
      req.login(user, function(err) {
        if (err) { return res.send({ success: false, error: err }) }
        return res.send({ success: true })
      })
    })(req, res, next)
  }
}

const logout = (req, res) => {
  req.logout()
  res.send({ success: true })
}

const router = (passport) => {
  return express.Router()
    .post('/login', login(passport))
    .post('/logout', logout)
    .get('/users', getStatus)
    .get('/users/:username', getUser)
    .post('/users', createUser)
    .put('/users/:username', updateUser)
    .delete('/users/:username', deleteUser)
}
export default router
