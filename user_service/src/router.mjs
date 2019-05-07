import { User } from './schema.mjs'
import express from 'express'

// Authenticate
const authenticateUser = (req, res) => {
  User.findOne({
    username: req.params.username
  }, (error, user) => {
    if (error || !user) {
      console.log(error)
      res.status(403).send({ authenticated: false, error: "Invalid user"})
      return
    }
    if (req.body && req.body.password && user.validPassword(req.body.password)) {
      res.status(200).send({ authenticated: true })
    } else {
      res.status(403).send({ authenticated: false, error: "Invalid password" })
    }
  })
}

// Fetch all user
const getUser = (req, res) => {
  User.findOne({
    username: req.params.username
  }, (error, user) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
      return
    } else if (user) {
      res.send({ username: user.username })
    } else {
      res.send({ error: "User not found" })
    }
  })
}

// Create a user
const createUser = (req, res) => {
  new User({
    ...req.body
  }).save(error => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
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
    if (error || !user) {
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

export default express.Router()
  .get('/users/:username', getUser)
  .post('/users/:username/authenticate', authenticateUser)
  .post('/users', createUser)
  .put('/users/:username', updateUser)
  .delete('/users/:username', deleteUser)