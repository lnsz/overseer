const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DashboardSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  creator: { type: String, default: 'Guest' },
  stars: { type: Number, default: 0 },
  copies: { type: Number, default: 0 },
  refreshTimer: { type: Number, default: 30000 },
  locked: { type: Boolean, default: false },
  style: {
    color: {
      backgroundColor: String,  // Color of the dashboard background
      textColor: String,        // Default color of text, can be overriden by tile styles
      tileColor: String,        // Default color of tiles, can be overriden by tile styles
      primaryColor: String,     // Color of main buttons (save, open fab)
      secondaryColor: String,   // Color of secondary buttons (back, fab options)
    },
    layout: {
      rows: { type: Number, default: 1 },
      columns: { type: Number, default: 1 },
      marginX: { type: Number, default: 0 },
      marginY: { type: Number, default: 0 },
      verticalCompact: { type: Boolean, default: true },
      tileBorderRadius: { type: Number, default: 0 }
    }
  }
})

const Dashboard = mongoose.model('Dashboard', DashboardSchema)
module.exports = Dashboard