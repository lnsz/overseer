import mongoose from 'mongoose'
const Schema = mongoose.Schema

const DashboardSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  creator: {
    type: String,
    default: 'Guest'
  },
  stars: {
    type: Number,
    default: 0
  },
  copies: {
    type: Number,
    default: 0
  },
  refreshTimer: {
    type: Number,
    default: 30
  },
  locked: {
    type: Boolean,
    default: false
  },
  permissions: {
    private: {
      type: Boolean,
      default: false
    },
    users: [
      {
        username: String,
        role: {
          type: String,
          enum: ['viewer', 'editor', 'admin'],
          default: 'viewer'
        }
      }
    ],
  },
  tileSettings: {              // Default tile settings
    tileColor: String,
    textColor: String,
    tileBorderRadius: { type: Number, default: 0 }
  },
  layout: {
    rows: { type: Number, default: 4 },
    columns: { type: Number, default: 4 },
    marginX: { type: Number, default: 0 },
    marginY: { type: Number, default: 0 },
    showGrid: { type: Boolean, default: false },
    freePlacement: { type: Boolean, default: false },
  }
})

export const Dashboard = mongoose.model('Dashboard', DashboardSchema)