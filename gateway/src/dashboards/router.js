const router  = require('express').Router()
const axios = require('axios')
const dashboardService = `http://${process.env.DASHBOARD_SERVICE_IP}:${process.env.DASHBOARD_SERVICE_HP}`

// Fetch all dashboards
const fetchDashboards = (req, res) => {
  axios.get(`${dashboardService}${req.originalUrl}`)
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
  axios.post(`${dashboardService}${req.originalUrl}`, body)
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
  axios.put(`${dashboardService}${req.originalUrl}`, req.body)
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
  axios.get(`${dashboardService}${req.originalUrl}`)
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
  axios.delete(`${dashboardService}${req.originalUrl}`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.send({ error: error.response.data })
    })
}

router
  .get('/dashboards', fetchDashboards)
  .get('/dashboards/:dashboard_id', getDashboard)
  .post('/dashboards', createDashboard)
  .put('/dashboards/:dashboard_id', updateDashboard)
  .delete('/dashboards/:dashboard_id', deleteDashboard)

module.exports = router
