import express from 'express'
import axios from 'axios'

// Fetch all dashboards
const fetchDashboards = (req, res) => {
  axios.get(`${process.env.DASHBOARD_SERVICE_URL}${req.originalUrl}`)
    .then((response) => {
      let dashboards = response.data.dashboards
      if (!req.user) {
        dashboards = dashboards.filter((dashboard) => {
          return !dashboard.permissions.private
        })
      }
      if (req.user && req.user.username) {
        dashboards = dashboards.filter((dashboard) => {
          return !dashboard.permissions.private ||
            dashboard.permissions.users.map(user => user.username).includes(req.user.username)
        })
      }
      res.send({ dashboards: dashboards })
    })
    .catch((error) => {
      console.log(error)
      res.status(404).send({ error: error.response.data })
    })
}

// Create a dashboard
const createDashboard = (req, res) => {
  let body = { ...req.body }
  if (req.user && req.user.username) body.creator = req.user.username
  axios.post(`${process.env.DASHBOARD_SERVICE_URL}${req.originalUrl}`, body)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.status(400).send({ error: error.response.data })
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
      res.status(400).send({ error: error.response.data })
    })
}

// Fetch single dashboard
const getDashboard = (req, res) => {
  axios.get(`${process.env.DASHBOARD_SERVICE_URL}${req.originalUrl}`)
    .then((response) => {
      let dashboard = response.data
      if (!req.user && dashboard.permissions.private) {
        dashboard = null
      }
      if (req.user &&
        req.user.username &&
        dashboard.permissions.private &&
        !dashboard.permissions.users.map(user => user.username).includes(req.user.username)
      ) {
        dashboard = null
      }
      res.send(dashboard)
    })
    .catch((error) => {
      console.log(error)
      res.status(404).send({ error: error.response.data })
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
      res.status(400).send({ error: error.response.data })
    })
}

export default express.Router()
  .get('/dashboards', fetchDashboards)
  .get('/dashboards/:dashboard_id', getDashboard)
  .post('/dashboards', createDashboard)
  .put('/dashboards/:dashboard_id', updateDashboard)
  .delete('/dashboards/:dashboard_id', deleteDashboard)
