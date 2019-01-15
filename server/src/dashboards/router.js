const Dashboard = require('./schema');
const router  = require('express').Router()

// Fetch all dashboards
const getDashboards = (req, res) => {
  Dashboard.find({}, (error, dashboards) => {
    if (error) {
       console.error(error);
    }
    res.send({
      dashboards: dashboards
    })
  }).sort({_id:-1})
}

// Create a dashboard
const createDashboard = (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let new_dashboard = new Dashboard({
    title: title,
    description: description,
    tiles: []
  })
  new_dashboard.save((error) => {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Dashboard created successfully'
    })
  })
}

// Update a dashboard
const updateDashboard = (req, res) => {
  Dashboard.findById(req.params.id, (error, dashboard) => {
    if (error) {
      console.error(error);
    }
    dashboard.title = req.body.title
    dashboard.description = req.body.description
    dashboard.save((error) => {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
}

// Fetch single dashboard
const fetchDashboard = (req, res) => {
  Dashboard.findById(req.params.id, (error, dashboard) => {
    if (error) {
      console.error(error);
    }
    res.send(dashboard)
  })
}

// Delete a dashboard
const deleteDashboard = (req, res) => {
  Dashboard.remove({
    _id: req.params.id
  }, (error) => {
    if (error)
      res.send(error)
    res.send({
      success: true
    })
  })
}

router.get('/dashboards', getDashboards);
router.get('/dashboards/:id', fetchDashboard)
router.post('/dashboards', createDashboard)
router.put('/dashboards/:id', updateDashboard) 
router.delete('/dashboards/:id', deleteDashboard)

module.exports = router