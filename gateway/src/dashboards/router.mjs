import express from 'express'
import axios from 'axios'

// Fetch all dashboards
const fetchDashboards = (req, res) => {
  axios.get(`${process.env.DASHBOARD_SERVICE_URL}${req.originalUrl}`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.send({ error: error.response.data })
    })
}

// Create a dashboard
const createDashboard = (req, res) => {
  let body = { ...req.body }
  if (req.user && req.user.username) body["creator"] = req.user.username
  axios.post(`${process.env.DASHBOARD_SERVICE_URL}${req.originalUrl}`, body)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.send({ error: error.response.data })
    })
}

// Update a dashboard
const updateDashboard = (req, res) => {
  axios.put(`${process.env.DASHBOARD_SERVICE_URL}${req.originalUrl}`, req.body)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.send({ error: error.response.data })
    })
}

// Fetch single dashboard
const getDashboard = (req, res) => {
  axios.get(`${process.env.DASHBOARD_SERVICE_URL}${req.originalUrl}`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.send({ error: error.response.data })
    })
}

// Delete a dashboard
const deleteDashboard = (req, res) => {
  axios.delete(`${process.env.DASHBOARD_SERVICE_URL}${req.originalUrl}`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.send({ error: error.response.data })
    })
}

export default express.Router()
  .get('/dashboards', fetchDashboards)
  .get('/dashboards/:dashboard_id', getDashboard)
  .post('/dashboards', createDashboard)
  .put('/dashboards/:dashboard_id', updateDashboard)
  .delete('/dashboards/:dashboard_id', deleteDashboard)
