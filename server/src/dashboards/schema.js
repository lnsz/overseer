const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DashboardSchema = new Schema({
  title: String,
  description: String,
})

const Dashboard = mongoose.model('Dashboard', DashboardSchema)
module.exports = Dashboard