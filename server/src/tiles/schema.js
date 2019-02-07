const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TileSchema = new Schema({
  dashboard_id: { type: Schema.ObjectId, ref: 'Dashboard' },
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
    enum: ['status', 'iframe', 'piechart']
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


const Tile = mongoose.model("Tile", TileSchema)
const autoPopulate = (next) => {
  this.populate('style')
  next()
}

TileSchema
  .pre('save', autoPopulate)
  .pre('find', autoPopulate)
  .pre('findOne', autoPopulate)

module.exports = Tile