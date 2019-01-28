const Dashboard = require('./schema')
const router  = require('express').Router()

// Fetch all dashboards
const fetchDashboards = (req, res) => {
  Dashboard.find({}, (error, dashboards) => {
    if (error) res.send({ error: error })
    res.send({ dashboards: dashboards })
  }).sort({ _id:-1 })
}

// Create a dashboard
const createDashboard = (req, res) => {
  new Dashboard({
    name: req.body.name,
    ...req.body
  }).save((error) => {
    if (error) res.send({ error: error })
    res.send({
      success: true,
      message: 'Dashboard created successfully'
    })
  })
}

// Update a dashboard
const updateDashboard = (req, res) => {
  Dashboard.findById(req.params.dashboard_id, (error, dashboard) => {
    if (error) res.send({ error: error })
    Object.keys(req.body).forEach( key => { if (req.body) dashboard[key] = req.body[key] } )
    dashboard.save((error) => {
      if (error) res.send({ error: error })
      res.send({ success: true })
    })
  })
}

// Fetch single dashboard
const getDashboard = (req, res) => {
  Dashboard.findById(req.params.dashboard_id, (error, dashboard) => {
    if (error) res.send({ error: error })
    res.send(dashboard)
  })
}

// Delete a dashboard
const deleteDashboard = (req, res) => {
  Dashboard.remove({ _id: req.params.dashboard_id }, (error) => {
    if (error) res.send({ error: error })
    res.send({ success: true })
  })
}

router
  .get('/dashboards', fetchDashboards)
  .get('/dashboards/:dashboard_id', getDashboard)
  .post('/dashboards', createDashboard)
  .put('/dashboards/:dashboard_id', updateDashboard)
  .delete('/dashboards/:dashboard_id', deleteDashboard)

module.exports = router