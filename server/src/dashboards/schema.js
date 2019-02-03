const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DashboardSchema = new Schema({
  name: String,
  description: String,
  rows: Number,
  columns: Number,
  creator: String,
  stars: Number,
  copies: Number,
  style: {
    backgroundColor: String,  // Color of the dashboard background
    textColor: String,        // Default color of text, can be overriden by tile styles
    tileColor: String,        // Default color of tiles, can be overriden by tile styles
    primaryColor: String,     // Color of main buttons (save, open fab)
    secondaryColor: String,   // Color of secondary buttons (back, fab options)
  }
})

const Dashboard = mongoose.model('Dashboard', DashboardSchema)
module.exports = Dashboard