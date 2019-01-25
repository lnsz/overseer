const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DashboardSchema = new Schema({
  name: String,
  description: String,
  creator: String,
  stars: Number,
  copies: Number
})

const Dashboard = mongoose.model('Dashboard', DashboardSchema)
module.exports = Dashboard