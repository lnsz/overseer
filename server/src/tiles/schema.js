const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TileSchema = new Schema({
  dashboard_id: { type: Schema.ObjectId, ref: 'Dashboard' },
  name: String,
  description: String,
  updated: Date,
  url: String,
  type: { 
    type: String,
    enum: ['status', 'iframe', 'piechart']
  },
  status: {
    state: { 
      type: String,
      enum: ['online', 'offline', '']
    },
  },
  chart: {
    data: Object,
    options: Object
  },
  style: {
    textColor: String,
    backgroundColor: String,
    offlineColor: String,
    onlineColor: String,
    zoomLevel: Number
  }
})

const Tile = mongoose.model("Tile", TileSchema)
module.exports = Tile