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
      res.status(500).send(error)
    })
}

// Create a dashboard
const createDashboard = (req, res) => {
  axios.post(`${dashboardService}${req.originalUrl}`, req.body)
    .then((response) => {
      res.send(response.data)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send(error)
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
      res.status(500).send(error)
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
      res.status(500).send(error)
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
      res.status(500).send(error)
    })
}

router
  .get('/dashboards', fetchDashboards)
  .get('/dashboards/:dashboard_id', getDashboard)
  .post('/dashboards', createDashboard)
  .put('/dashboards/:dashboard_id', updateDashboard)
  .delete('/dashboards/:dashboard_id', deleteDashboard)

module.exports = router
