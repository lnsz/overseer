import { Dashboard } from './schema.mjs'
import express from 'express'

// Fetch all dashboards
const fetchDashboards = (req, res) => {
  Dashboard.find({}, (error, dashboards) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }  
    res.send({ dashboards: dashboards })
  }).sort({ _id:-1 })
}

// Create a dashboard
const createDashboard = (req, res) => {
  let body = req.body
  if (body.creator) {
    body.permissions.users = [] 
    body.permissions.users.push({
      username: body.creator,
      role: 'admin'
    })
  } else {
    body.permissions = {}
  }
  new Dashboard({
    stars: 0,
    copies: 0,
    ...body
  }).save((error, dashboard) => {
    if (error || !dashboard) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    res.send({
      success: true,
      message: 'Dashboard created successfully',
      dashboard: dashboard
    })
  })
}

// Update a dashboard
const updateDashboard = (req, res) => {
  Dashboard.findById(req.params.dashboard_id, (error, dashboard) => {
    if (error || !dashboard) {
      console.log(error)
      res.status(500).send(error)
      return
    } 
    Object.keys(req.body).forEach( key => { if (req.body) dashboard[key] = req.body[key] } )
    dashboard.save((error) => {
      if (error) {
        console.log(error)
        res.status(500).send(error)
        return
      }
      res.send({ success: true })
    })
  })
}

// Fetch single dashboard
const getDashboard = (req, res) => {
  Dashboard.findById(req.params.dashboard_id, (error, dashboard) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    res.send(dashboard)
  })
}

// Delete a dashboard
const deleteDashboard = (req, res) => {
  Dashboard.remove({ _id: req.params.dashboard_id }, (error) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    res.send({ success: true })
  })
}

export default express.Router()
  .get('/dashboards', fetchDashboards)
  .get('/dashboards/:dashboard_id', getDashboard)
  .post('/dashboards', createDashboard)
  .put('/dashboards/:dashboard_id', updateDashboard)
  .delete('/dashboards/:dashboard_id', deleteDashboard)
