import mongoose from 'mongoose'
const Schema = mongoose.Schema

const TileSchema = new Schema({
  dashboard_id: String,
  name: String,
  description: String,
  updated: Date,
  url: String,
  layout: {
    width: Number,
    height: Number,
    x: Number,
    y: Number
  },
  type: { 
    type: String,
    enum: ['status', 'iframe', 'image', 'piechart', 'text'],
    default: 'text'
  },
  status: {
    state: {
      type: String,
      enum: ['online', 'offline', '']
    },
  },
  iframe: {
    zoomLevel: Number
  },
  chart: {
    data: Object,
    options: Object
  },
  style: {
    textColor: String,
    backgroundColor: String,
    offlineColor: String,
    onlineColor: String
  }
})

export const Tile = mongoose.model("Tile", TileSchema)