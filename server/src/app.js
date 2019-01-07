const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const Dashboard = require('../models/dashboards');
const Tiles = require('../models/tiles');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// DB Setup
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL || 'http://localhost'
mongoose.connect(`mongodb://${DATABASE_URL}`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', (callback) => {
  console.log('Connection Succeeded');
});

// Dashboard endpoints
// Fetch all dashboards
app.get('/dashboards', (req, res) => {
  Dashboard.find({}, (error, dashboards) => {
    if (error) {
       console.error(error);
    }
    res.send({
      dashboards: dashboards
    })
  }).sort({_id:-1})
});

// Create a dashboard
app.post('/dashboards', (req, res) => {
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
})

// Fetch single dashboard
app.get('/dashboards/:id', (req, res) => {
  Dashboard.findById(req.params.id, (error, dashboard) => {
    if (error) {
      console.error(error);
    }
    res.send(dashboard)
  })
})

// Update a dashboard
app.put('/dashboards/:id', (req, res) => {
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
})

// Delete a dashboard
app.delete('/dashboards/:id', (req, res) => {
  Dashboard.remove({
    _id: req.params.id
  }, (error) => {
    if (error)
      res.send(error)
    res.send({
      success: true
    })
  })
})

app.listen(process.env.PORT || 8081)
